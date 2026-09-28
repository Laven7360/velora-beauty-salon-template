import LazyRasterImage from '../LazyRasterImage'
export default function TeamPortrait({ member, eager = false }) {
  return <div className="artist-portrait"><svg viewBox={member.portrait.cell * 100 + ' 0 100 150'} preserveAspectRatio="xMidYMid slice" role="img" aria-label={member.alt} focusable="false"><LazyRasterImage eager={eager} href={member.portrait.src} width="300" height="150" /></svg></div>
}

