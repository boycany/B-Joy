const BoundingBox = ({ box }) => {
  let boxHTML = [];

  for (let i = 0; i < box.length; i++) {
    boxHTML.push(
      <div
        className="bounding-box"
        key={i}
        style={{
          top: box[i].top_row,
          right: box[i].right_col,
          bottom: box[i].bottom_row,
          left: box[i].left_col,
        }}
      ></div>
    );
  }

  return <div>{boxHTML}</div>;
};

export default BoundingBox;
