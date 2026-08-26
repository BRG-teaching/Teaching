/**
 * dispatcher.ts — encode viewer messages as COMPAS-protobuf bytes.
 *
 * The compas-threejs viewer has exactly one input: dispatch(bytes), where the
 * bytes are a compas_pb MessageData envelope holding either a geometry object
 * (rendered into the scene) or a Dictionary command (camera, material,
 * visibility...).  This module wraps @gramaziokohler/compas-pb-ts so the rest
 * of the app never touches protobuf.
 *
 * The command envelope follows the viewer's own examples: every value is an
 * AnyData — numbers as { doubleValue }, everything else as { value }.
 */

import { Dictionary, Mesh, pbDumpBytes } from '@gramaziokohler/compas-pb-ts'
import type { CompasViewer } from '@compas-dev/compas-threejs-ts'
import { preToneMap } from './aces'

function anyValue(v: unknown) {
  return typeof v === 'number' ? { doubleValue: v } : { value: v }
}

/** encode a Dictionary command message */
export function command(values: Record<string, unknown>): Uint8Array {
  const items = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, anyValue(v)]))
  return pbDumpBytes(new Dictionary({ data: { items } }))
}

/** encode a triangle mesh geometry message (all faces are triangles) */
export function meshMessage(guid: string, name: string, vertices: number[]): Uint8Array {
  const faceCount = vertices.length / 9
  const faceVertices: number[] = []
  const faceSizes: number[] = []
  for (let f = 0; f < faceCount; f++) {
    faceVertices.push(f * 3, f * 3 + 1, f * 3 + 2)
    faceSizes.push(3)
  }
  return pbDumpBytes(
    new Mesh({
      data: {
        guid,
        name,
        vertices,
        faceVertices,
        faceSizes,
        attributes: {},
        vertexAttributeColumns: [],
        faceAttributeColumns: [],
        edgeAttributeColumns: [],
        edgeKeys: [],
        defaultVertexAttributes: {},
        defaultFaceAttributes: {},
        defaultEdgeAttributes: {},
      },
    }),
  )
}

/**
 * Flat, unlit, exact color: with lighting disabled the standard material
 * renders pure emissive, and preToneMap() pre-compensates the viewer's
 * ACES tone mapping so `hex` is what actually appears on screen.
 */
export function materialCommand(
  materialGuid: string,
  geometryGuid: string,
  hex: string,
  opacity = 1,
): Uint8Array {
  return command({
    dispatch: 'material',
    type: 'standard_material',
    guid: materialGuid,
    geometry_guid: geometryGuid,
    color: '#000000',
    metalness: 0,
    roughness: 1,
    emissive: preToneMap(hex),
    emissive_intensity: 1,
    flat_shading: true,
    wireframe: false,
    transparent: opacity < 1,
    opacity,
  })
}

export function visibilityCommand(guid: string, visible: boolean): Uint8Array {
  return command({ dispatch: 'handle_geometry', type: 'set_visibility', guid, visible })
}

export function sceneCommand(type: string, extra: Record<string, unknown> = {}): Uint8Array {
  return command({ dispatch: 'scene', type, ...extra })
}

/** small convenience: dispatch several messages in order */
export function dispatchAll(viewer: CompasViewer, messages: Uint8Array[]) {
  for (const m of messages) viewer.dispatch(m)
}
