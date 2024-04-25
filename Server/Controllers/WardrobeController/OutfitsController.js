const createOutfit = async (req, res) => {
  try {
    const id = req.user;
    const { clothingItemsID } = req.body;

    if (clothingItemsID.length == 0) {
      //throw error
    }
  } catch (error) {}
};

const getOutfits = async () => {
  try {
  } catch (error) {}
};
const getOutfitById = async () => {
  try {
  } catch (error) {}
};

const updateOutfit = async () => {
  try {
  } catch (error) {}
};

const deleteOutfit = async () => {
  try {
  } catch (error) {}
};

module.exports = {
  createOutfit,
  getOutfits,
  getOutfitById,
  updateOutfit,
  deleteOutfit,
};
