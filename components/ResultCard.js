import DownloadButton from './DownloadButton';

const ResultCard = ({ result }) => {
  if (!result) return null;

  return (
    <div className="result-card">
      <div className="thumbnail">
        <img src={result.image || result.thumbnail} alt={result.title} />
      </div>
      <div className="details">
        <h3>{result.title}</h3>
        <DownloadButton url={result.downloadUrl} />
      </div>
    </div>
  );
};

export default ResultCard;
