import sys,glob
from PIL import Image,ImageDraw
ref=sorted(glob.glob(sys.argv[1]+'/s*.png'));got=sorted(glob.glob(sys.argv[2]+'/s*.png'));out=sys.argv[3]
w,h=800,450
pairs=list(zip(ref,got))
sel=[int(x) for x in sys.argv[4].split(',')] if len(sys.argv)>4 else range(1,len(pairs)+1)
sel=list(sel)
for k in range(0,len(sel),3):
  ch=sel[k:k+3]
  im=Image.new('RGB',(2*w+24,len(ch)*(h+28)+8),'#333')
  for i,n in enumerate(ch):
    a,b=pairs[n-1]
    for j,f in enumerate((a,b)):
      im.paste(Image.open(f).convert('RGB').resize((w,h)),(8+j*(w+8),8+i*(h+28)))
    ImageDraw.Draw(im).text((8,8+i*(h+28)+h+4),f'slide {n}: HTML (left) vs PPTX (right)',fill='white')
  im.save(f'{out}-{k//3+1:02d}.jpg',quality=82)
