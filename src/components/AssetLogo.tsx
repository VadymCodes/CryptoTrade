interface AssetLogoProps {
  id: string;
}

const AssetLogo = ({id}: AssetLogoProps) => {
  const url = `https://messari.io/asset-images/${id}/16.png`;

  return (
    <img src={url} className="rounded" alt="asset logo"/>
  )
}

export default AssetLogo;