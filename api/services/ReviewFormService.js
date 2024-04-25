const ReviewForm = require("../models/ReviewForm");

module.exports = {

    submitReview(reviewData, callback) {
        Logger.debug('ReviewFormService.submitReview');
        console.log('ReviewFormService.submitReview', reviewData);
        ReviewForm.createReviewForm(reviewData, (err, savedReview) => {
            console.log('savedReview before', savedReview);
          if (err) {
            console.log('errorrrrrrrrrrrrrrrrrrrrr', err);
            Logger.error(`ReviewFormService.submitReview at ReviewForm.createReviewForm ${err}`);
            callback(err);
          } else {
            Logger.info('Review details saved successfully.');
            console.log('savedReview after', savedReview);
    
            callback(null, savedReview);
          }
        });
      },

      getReviewForm(id, callback){
        Logger.debug('ReviewFormService.getReviewForm');
       ReviewForm.getReviewForm(id, (err, reviewFormData) => {
          if (err) {
            Logger.error(`ReviewFormService.getReviewForm at ReviewForm.getReviewForm ${err}`);
            callback(err);
          } else {
            callback(null, reviewFormData);
          }
        });
      }
      
}