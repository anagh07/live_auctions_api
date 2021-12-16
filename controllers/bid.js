const Ad = require('../models/Ad');
const io = require('../socket');

// @route   POST /bid/:adId
// @desc    Post a new ad
exports.addBid = async (req, res, next) => {
  const { adId } = req.params;
  const { amount } = req.query;

  try {
    const ad = await Ad.findById(adId).populate('owner', { password: 0 });
    if (!ad) return res.status(404).json({ errors: [{ msg: 'Ad not found' }] });
    // Check bid validity
    if (parseFloat(ad.currentPrice) >= parseFloat(amount)) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Bid amount less than existing price' }] });
    }
    if (ad.sold || ad.auctionEnded || !ad.auctionStarted) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Auction has ended or has not started' }] });
    }
    ad.bids.push({ user: req.user.id, amount: amount });
    ad.currentPrice = amount;
    ad.currentBidder = req.user.id;
    const savedAd = await ad.save();
    // io.getIo().emit('bidPosted', { action: 'bid', data: ad });
    console.log(`Emitting to ${ad._id}`);
    io.getAdIo().to(ad._id.toString()).emit('bidPosted', { action: 'post', data: ad });
    res.status(200).json(savedAd);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// @route   GET /bid/:adId?option=<highest>
// @desc    List of bids on an ad
exports.listBids = async (req, res, next) => {
  const { adId } = req.params;
  let { option } = req.query;
  option = option ? option : 'default';

  try {
    const ad = await Ad.findById(adId);
    await ad.populate('bids.user', { password: 0 });
    if (!ad) return res.status(404).json({ errors: [{ msg: 'Ad not found' }] });
    const bidList = ad.bids;
    if (option.toString() === 'highest') {
      res.status(200).json([bidList[bidList.length - 1]]);
    } else {
      res.status(200).json(bidList);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};
