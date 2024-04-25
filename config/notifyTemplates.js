/**
 * Notification Templates configuration
 * (sails.config.notifyTemplates)
 * @description :: Configuration for notification templates.
 */


module.exports.notifyTemplates = {

    /* UpdateProfile: {
      web: '<li class="timeline-item"><div class="timeline-icon"><span class="fa fa-envelope text-sBlue"></span></div><div class="media-body"><h5 class="media-heading"> Timeline Post <small class="notifyTime"><img class="notifyBadge" src="/favicon.ico" height="13" width="13" ><time class="timeago" data-toggle="tooltip" title="{{displayDate}}" datetime="{{createdAt}}"></time></small></h5><p> <b>{{name}}</b> updated profile.</p><div class="media-links"></div></div></li>',
      email: '',
    }, */
  
    // UpdateProfile: '<li class="timeline-item"><div class="timeline-icon"><span class="fa fa-envelope text-sBlue"></span></div><div class="media-body"><h5 class="media-heading"> Timeline Post <small class="notifyTime"><img class="notifyBadge" src="/favicon.ico" height="13" width="13" ><time class="timeago" data-toggle="tooltip" title="{{displayDate}}" datetime="{{createdAt}}"></time></small></h5><p> <b>{{name}}</b> updated profile</p><div class="media-links"></div></div></li>',
  
    // addFAQ: '<li class="timeline-item"><div class="timeline-icon"><span class="fa fa-envelope text-sBlue"></span></div><div class="media-body"><h5 class="media-heading"> Timeline Post <small class="notifyTime"><img class="notifyBadge" src="/favicon.ico" height="13" width="13" ><time class="timeago" data-toggle="tooltip" title="{{displayDate}}" datetime="{{createdAt}}"></time></small></h5><p> Added new FAQ.</p><div class="media-links"></div></div></li>',
  
    /** *************** FAQ  ***************** */
    proposalRejectionToCoordinator: {
      // web: '<li class="timeline-item"><div class="timeline-icon"><span class="fa fa-envelope text-sBlue"></span></div><div class="media-body"><h5 class="media-heading"> Timeline Post <small class="notifyTime"><img class="notifyBadge" src="/favicon.ico" height="13" width="13" ><time class="timeago" data-toggle="tooltip" title="{{displayDate}}" datetime="{{createdAt}}"></time></small></h5><p> Added new FAQ.</p><div class="media-links"></div></div></li>',
      web: '<li className="gx-media"><div className="gx-media-body gx-align-self-center"> <span style="display: block;" className="gx-fs-sm gx-mb-0">Proposal Rejected</span><i className="icon icon-{{icon}} gx-pr-2" /> <span className="gx-meta-date"><small>{{displayDate}}</small></span></div></li><div></div>',
      email: '',
    },
    proposalRejectionToInvestigator: {
        // web: '<li class="timeline-item"><div class="timeline-icon"><span class="fa fa-envelope text-sBlue"></span></div><div class="media-body"><h5 class="media-heading"> Timeline Post <small class="notifyTime"><img class="notifyBadge" src="/favicon.ico" height="13" width="13" ><time class="timeago" data-toggle="tooltip" title="{{displayDate}}" datetime="{{createdAt}}"></time></small></h5><p> Added new FAQ.</p><div class="media-links"></div></div></li>',
        web: '<li className="gx-media"><div className="gx-media-body gx-align-self-center"> <span style="display: block;" className="gx-fs-sm gx-mb-0">Proposal Rejected</span><i className="icon icon-{{icon}} gx-pr-2" /> <span className="gx-meta-date"><small>{{displayDate}}</small></span></div></li><div></div>',
        email: '',
      },
      sendFullReviewEndReminderToCoordinator: {
        // web: '<li class="timeline-item"><div class="timeline-icon"><span class="fa fa-envelope text-sBlue"></span></div><div class="media-body"><h5 class="media-heading"> Timeline Post <small class="notifyTime"><img class="notifyBadge" src="/favicon.ico" height="13" width="13" ><time class="timeago" data-toggle="tooltip" title="{{displayDate}}" datetime="{{createdAt}}"></time></small></h5><p> Added new FAQ.</p><div class="media-links"></div></div></li>',
        web: '<li className="gx-media"><div className="gx-media-body gx-align-self-center"> <span style="display: block;" className="gx-fs-sm gx-mb-0">The time allocated for the proposal title {{title}} under full review process is about to end</span><i className="icon icon-{{icon}} gx-pr-2" /> <span className="gx-meta-date"><small>{{displayDate}}</small></span></div></li><div></div>',
        email: '',
      },
  };
  