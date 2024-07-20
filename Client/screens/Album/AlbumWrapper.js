const { useContext } = require("react");
const {
  addClothingItemContext,
} = require("./AddClothingItemContextProvider/AddClothingItemContext");
const { default: AlbumSingle } = require("./AlbumSingle");

const AlbumWrapper = (props) => {
  const { loading } = useContext(addClothingItemContext);

  return <AlbumSingle {...props} loading={loading} />;
};

export default AlbumWrapper;
