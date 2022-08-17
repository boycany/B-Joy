const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
  return (
    <div>
      <div className="f6">
        <p className="underline">{`＊使用說明：`}</p>
        <p>{`B-Joy喜歡蒐集人臉微笑的圖片，它在等待你的餵食。`}</p>
        <p>{`一點一滴地吸取喜悅的養分後，究竟會長成怎麼樣呢？`}</p>
        <p>{`來試試看吧！`}</p>
      </div>
      <div className="center">
        <div className="center pa4 br3 shadow-5" style={{ width: "700px" }}>
          <input
            type="text"
            className="f4 pa2 w-70 center"
            onChange={onInputChange}
            placeholder="請餵食圖片連結"
          />
          <button
            className="w-30 grow f4 ml2 link ph3 pv2 dib bg-light-blue"
            onClick={onPictureSubmit}
          >
            傳送
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
