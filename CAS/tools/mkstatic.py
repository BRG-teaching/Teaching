import re,sys
src=open(sys.argv[1],encoding='utf-8').read()
helmet=re.search(r'<helmet>(.*?)</helmet>',src,re.S).group(1)
imp=re.search(r'<x-import[^>]*>(.*?)</x-import>',src,re.S).group(1)
base=sys.argv[3]
html=f'''<!DOCTYPE html><html><head><meta charset="utf-8"><base href="file://{base}/">{helmet}
<style>body{{margin:0;background:#888}} .deck>section{{width:1920px;height:1080px;position:relative;overflow:hidden !important;box-sizing:border-box !important}} .deck{{display:flex;flex-direction:column;gap:0;width:1920px}}</style></head>
<body><div class="deck">{imp}</div></body></html>'''
open(sys.argv[2],'w',encoding='utf-8').write(html)
