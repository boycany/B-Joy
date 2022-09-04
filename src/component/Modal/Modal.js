import "./Modal.css";
import loading from "../../Loading.svg";

const Modal = ({
  isGrowUp,
  isLoading,
  closeGrowUpModal,
  isError,
  closeErrorModal,
}) => {
  //   console.log("isCopied :>> ", isCopied);
  return (
    <div className="popup">
      <div className="popup-inner">
        {isLoading && (
          <>
            <p>Loading...</p>
            <img src={loading} alt="" className="popup-inner-svg" />
          </>
        )}
        {isGrowUp && (
          <>
            <p>怪獸長大了！</p>
            <p>你有發現嗎？</p>
            <button
              className="popup-close-btn"
              onClick={() => closeGrowUpModal()}
            >
              我知道了
            </button>
          </>
        )}
        {isError && (
          <>
            <p>錯誤訊息：</p>
            <p>{isError}</p>
            <button
              className="popup-close-btn"
              onClick={() => closeErrorModal()}
            >
              OK
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
