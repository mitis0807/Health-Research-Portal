module.exports = {

    submitReview(reviewData, callback) {
        Logger.debug('ReviewFormService.submitReview');
        Logger.debug(reviewData);
        ReviewFormForAmendment.createReviewForm(reviewData, (err, savedReview) => {
            console.log('savedReview before', savedReview);
          if (err) {
            console.log('error', err);
            Logger.error(`ReviewFormForAmendmentService.submitReview at ReviewFormForAmendment.createReviewForm ${err}`);
            callback(err);
          } else {
            Logger.info('Review details saved successfully.');
            Logger.info(savedReview);
            callback(null, savedReview);
          }
        });
      },

      getReviewForm(id, callback){
        Logger.debug('ReviewFormForAmendmentService.getReviewForm');
       ReviewFormForAmendment.getReviewForm(id, (err, reviewFormData) => {
          if (err) {
            Logger.error(`ReviewFormForAmendmentService.getReviewForm at ReviewFormForAmendment.getReviewForm ${err}`);
            callback(err);
          } else {
            callback(null, reviewFormData);
          }
        });
      }
      
}