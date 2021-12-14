const Ad = require('../models/Ad');
const User = require('../models/User');

// @route   POST /auction/start/:adId
// @desc    Start auction
exports.startAuction = async (req, res, next) => {
  const { adId } = req.params;
  try {
    let ad = await Ad.findById(adId);
    if (!ad) return res.status(400).json({ errors: [{ msg: 'Ad not found' }] });
    if (ad.owner != req.user.id)
      return res.status(400).json({ errors: [{ msg: 'Unauthorized to start' }] });
    if (ad.auctionEnded)
      return res.status(400).json({ errors: [{ msg: 'Auction has already ended' }] });
    if (ad.auctionStarted)
      return res.status(400).json({ errors: [{ msg: 'Already started' }] });
    ad.auctionStarted = true;
    await ad.save();
    res.status(200).json({ msg: 'Auction started' });

    // Run down timer
    let duration = parseInt(ad.duration);
    let timer = parseInt(ad.timer);
    let intervalTimer = setInterval(async () => {
      timer -= 1;
      await ad.updateOne({ timer: timer });
    }, 1000);
    setTimeout(async () => {
      clearInterval(intervalTimer);
      let auctionEndAd = await Ad.findById(adId);
      auctionEndAd.purchasedBy = auctionEndAd.currentBidder;
      auctionEndAd.sold = true;
      auctionEndAd.auctionEnded = true;
      await auctionEndAd.save();
      // Add product to winner
      let winner = await User.findById(auctionEndAd.currentBidder);
      winner.purchasedProducts.push(auctionEndAd._id);
      await winner.save();
    }, (duration + 1) * 1000);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};
