const Rank = ({ userName, userEntries }) => {
  return (
    <div>
      <div className="f3 mb2">
        <p>{`${userName} 你好啊！`}</p>
        <p>{`你現在登錄圖片的次數是 ${userEntries} 次`}</p>
      </div>
    </div>
  );
};

export default Rank;
