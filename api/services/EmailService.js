const path = require('path');

const templatesDir = path.join(__dirname, '', 'templates');

const EmailTemplate = require('email-templates').EmailTemplate;

const nodemailer = require('nodemailer');

const noreplyEmail = sails.config.noreplyEmail;

const noreplyEmailPass = sails.config.noreplyEmailPass;


module.exports = {

  sendInviteEmailToInternalUser(user) {
    Logger.debug('EmailService.sendInviteEmailToInternalUser');
    const template = new EmailTemplate(path.join(templatesDir, 'userInvite-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.sendInviteEmailToInternalUser at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `You've received an invite from ${sails.config.stringLiterals.longProjectName}`,
        html: results.html,
        //html: 'Embedded image: <img src="cid:fiji-logo"/>',   
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.sendInviteEmailToInternalUser at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  sendEmailForForgotPassword(user) {
    Logger.debug('EmailService.sendEmailForForgotPassword');
    Logger.debug(user);

    const template = new EmailTemplate(path.join(templatesDir, 'forgotPassword-email'));

    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });
    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
    };
    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.sendEmailForForgotPassword at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `You're set up on ${sails.config.stringLiterals.longProjectName}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.sendEmailForForgotPassword at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  confirmAccountEmailToInvestigator(user) {
    Logger.debug('EmailService.confirmAccountEmailToInvestigator');
    const template = new EmailTemplate(path.join(templatesDir, 'confirmAccount-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.confirmAccountEmailToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `You're set up on ${sails.config.stringLiterals.longProjectName}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.confirmAccountEmailToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  submitProposalEmailToInvestigator(user, proposal) {
    Logger.debug('EmailService.submitProposalEmailToInvestigator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'submitProposal-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      referenceNumber: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.submitProposalEmailToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Proposal submitted on ${sails.config.stringLiterals.longProjectName}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.submitProposalEmailToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  submitProposalEmailToCoordinator(user, proposal) {
    Logger.debug('EmailService.submitProposalEmailToCoordinator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'submitProposalCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      referenceNumber: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.submitProposalEmailToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Proposal submitted on ${sails.config.stringLiterals.longProjectName}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.submitProposalEmailToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  markCompleteProposalEmailToInvestigator(user, proposal) {
    Logger.debug('EmailService.markCompleteProposalEmailToInvestigator');

    const template = new EmailTemplate(path.join(templatesDir, 'completeProposal-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.markCompletePropsalEmailToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Proposal accepted on ${sails.config.stringLiterals.longProjectName}`,
        html: results.html,
        //html: 'Embedded image: <img src="cid:fiji-logo"/>',   
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],  
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.markCompletePropsalEmailToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  markCompleteProposalEmailToCoordinator(user, proposal) {
    Logger.debug('EmailService.markCompleteProposalEmailToCoordinator');

    const template = new EmailTemplate(path.join(templatesDir, 'completeProposalToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.markCompleteProposalEmailToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Proposal accepted on ${sails.config.stringLiterals.longProjectName}`,
        html: results.html,
        //html: 'Embedded image: <img src="cid:fiji-logo"/>',   
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],  
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.markCompleteProposalEmailToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  markIncompleteProposalEmailToInvestigator(user, proposal) {
    Logger.debug('EmailService.markIncompletePropsalEmailToInvestigator');

    const template = new EmailTemplate(path.join(templatesDir, 'incompleteProposal-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      commentForMarkInComplete: proposal.commentForMarkInComplete
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.markIncompletePropsalEmailToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Proposal marked as incomplete on ${sails.config.stringLiterals.longProjectName}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.markIncompletePropsalEmailToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  markIncompleteProposalEmailToCoordinator(user, proposal) {
    Logger.debug('EmailService.markIncompletePropsalEmailToCoordinator');

    const template = new EmailTemplate(path.join(templatesDir, 'incompleteProposalToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      commentForMarkInComplete: proposal.commentForMarkInComplete
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.markIncompletePropsalEmailToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Proposal marked as incomplete on ${sails.config.stringLiterals.longProjectName}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.markIncompletePropsalEmailToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  rejectProposalEmailToInvestigator(user, proposal) {
    Logger.debug('EmailService.rejectProposalEmailToInvestigator');

    const template = new EmailTemplate(path.join(templatesDir, 'rejectProposal-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      referenceNumber: proposal.proposalId,
      comment: proposal.rejectionComment
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.rejectPropsalEmailToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Proposal rejected on ${sails.config.stringLiterals.longProjectName}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.rejectPropsalEmailToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  rejectProposalEmailToCoordinator(user, proposal) {
    Logger.debug('EmailService.rejectProposalEmailToCoordinator');

    const template = new EmailTemplate(path.join(templatesDir, 'rejectProposalCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      referenceNumber: proposal.proposalId,
      comment: proposal.rejectionComment
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.rejectPropsalEmailToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Proposal rejected on ${sails.config.stringLiterals.longProjectName} - ${proposal.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.rejectPropsalEmailToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  /** Functions for sending email after review type and reviewers are selected*/
  AssignedForExpeditedReviewToCoordinator(user, proposal) {
    Logger.debug('EmailService.AssignedForExpeditedReviewToCoordinator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'AssignedForExpeditedReviewToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.AssignedForExpeditedReviewToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Assigned for expedited review - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.AssignedForExpeditedReviewToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  AssignedForFullReviewToCoordinator(user, proposal) {
    Logger.debug('EmailService.AssignedForFullReviewToCoordinator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'AssignedForFullReviewToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.AssignedForFullReviewToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Assigned for full review - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.AssignedForFullReviewToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  AssignedForExpeditedReviewToReviewer(user, proposal) {
    Logger.debug('EmailService.AssignedForExpeditedReviewToReviewer');
    Logger.warn(user);
    Logger.warn(proposal);

    /**To get the array of email */
    let emailsArr = [];
    let reviewersArr = proposal.assignedReviewers;
    console.log('reviewersArr', typeof reviewersArr);

    reviewersArr.forEach(reviewer => {
      console.log('for each ele', reviewer);
      emailsArr.push({ name: `${reviewer.firstName} ${reviewer.lastName}`, address: reviewer.email });
    });
    console.log('email service array', emailsArr)

    const template = new EmailTemplate(path.join(templatesDir, 'AssignedForReviewToReviewer-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.AssignedForExpeditedReviewToReviewer at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: emailsArr,
        subject: `Assigned for expedited review - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.AssignedForExpeditedReviewToReviewer at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  AssignedForFullReviewToReviewer(user, proposal) {
    Logger.debug('EmailService.AssignedForFullReviewToReviewer');
    Logger.warn(user);
    Logger.warn(proposal);

    /**To get the array of email */
    let emailsArr = [];
   
    user.forEach(member => {
      emailsArr.push({ name: `${member.firstName} ${member.lastName}`, address: member.email });
    });
    console.log('email service array', emailsArr)

    const template = new EmailTemplate(path.join(templatesDir, 'AssignedForReviewToReviewer-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.AssignedForFullReviewToReviewer at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: emailsArr,
        subject: `Assigned for full review - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.AssignedForFullReviewToReviewer at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  AssignedForExemptedReviewToCoordinator(user, proposal) {
    Logger.debug('EmailService.AssignedForExemptedReviewToCoordinator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'AssignedForExemptedReviewToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.AssignedForExemptedReviewToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Assigned for exempted review - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.AssignedForExemptedReviewToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  AssignedForExemptedReviewToChair(user, proposal) {
    Logger.debug('EmailService.AssignedForExemptedReviewToChair');
    Logger.warn(user);
    Logger.warn(proposal);
    console.log('user in chair email', user)

    const template = new EmailTemplate(path.join(templatesDir, 'AssignedForExemptedReviewToChair-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.AssignedForExemptedReviewToChair at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Assigned for exempted review - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.AssignedForExemptedReviewToChair at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  amendmentAssignedForReviewToInvestigator(user,proposal){
    Logger.debug('EmailService.AssignedForReviewToInvestigator');
    Logger.warn(user);
    Logger.warn(proposal);
    console.log('user in email service', user)
    const template = new EmailTemplate(path.join(templatesDir, 'amendmentAssignedForReviewToInvestigator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
      reviewType: proposal.reviewType
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.AssignedForReviewToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Amendment under Review - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.AssignedForReviewToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  AssignedForReviewToInvestigator(user, proposal) {
    Logger.debug('EmailService.AssignedForReviewToInvestigator');
    Logger.warn(user);
    Logger.warn(proposal);
    console.log('user in email service', user)
    const template = new EmailTemplate(path.join(templatesDir, 'AssignedForReviewToInvestigator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
      reviewType: proposal.reviewType
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.AssignedForReviewToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Under Review - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.AssignedForReviewToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  sendFullReviewEndReminderToCoordinator(user, proposal) {
    Logger.debug('EmailService.sendFullReviewEndReminderToCoordinator');
    Logger.warn(user);
    Logger.warn(proposal);
    const template = new EmailTemplate(path.join(templatesDir, 'sendFullReviewEndReminderToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalId: proposal.proposalId,
      reviewType: proposal.reviewType,
      title: proposal.title
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.sendFullReviewEndReminderToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: 'Reminder for Committee Meeting - Full Review',
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.sendFullReviewEndReminderToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  /**Emails for review form submission in expedited process to reviewers */
  sendExpeditedReviewEndReminderToReviewers(user, proposal) {
    Logger.debug('EmailService.sendExpeditedReviewEndReminderToReviewers');
    Logger.warn(user);
    Logger.warn(proposal);
    let emailsArr = [];
   
    user.forEach(reviewer => {
      emailsArr.push({ name: `${reviewer.firstName} ${reviewer.lastName}`, address: reviewer.email });
    });
    console.log('email service array', emailsArr)

    const template = new EmailTemplate(path.join(templatesDir, 'sendExpeditedReviewEndReminderToReviewers-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalId: proposal.proposalId,
      reviewType: proposal.reviewType,
      title: proposal.title
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.sendExpeditedReviewEndReminderToReviewers at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: emailsArr,
        subject: 'Reminder to submit review form - Expedited Review',
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.sendExpeditedReviewEndReminderToReviewers at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  /**Emails for report submissions by investigator */

  SubmittedIntermediateReportToCoordinator(title, user, reportData) {
    Logger.debug('EmailService.SubmittedIntermediateReportToCoordinator');
    Logger.warn(user);
    console.log('email service user', user);
    Logger.warn(reportData);

    const template = new EmailTemplate(path.join(templatesDir, 'SubmittedIntermediateReportToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });
    let reportTypeName;
    if (reportData.reportType === 1)
      reportTypeName = 'Final Report';
    else if (reportData.reportType === 0)
      reportTypeName = 'Intermediate Report';

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      reportType: reportTypeName,
      proposalId: reportData.proposalId,
      proposalTitle: title
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.SubmittedIntermediateReportToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Submitted ${locals.reportType} - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.SubmittedIntermediateReportToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  SubmittedFinalReportToCoordinator(title, user, reportData) {
    Logger.debug('EmailService.SubmittedFinalReportToCoordinator');
    Logger.warn(user);
    console.log('email service user', user);
    Logger.warn(reportData);

    const template = new EmailTemplate(path.join(templatesDir, 'SubmittedFinalReportToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });
    let reportTypeName;
    if (reportData.reportType === 1)
      reportTypeName = 'Final Report';
    else if (reportData.reportType === 0)
      reportTypeName = 'Intermediate Report';

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      reportType: reportTypeName,
      proposalId: reportData.proposalId,
      proposalTitle: title
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.SubmittedFinalReportToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Submitted ${locals.reportType} - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.SubmittedFinalReportToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  SubmittedDataReportToCoordinator(title, user, reportData) {
    Logger.debug('EmailService.SubmittedDataReportToCoordinator');
    Logger.warn(user);
    console.log('email service user', user);
    Logger.warn(reportData);

    const template = new EmailTemplate(path.join(templatesDir, 'SubmittedDataReportToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });
    let reportTypeName;
    if (reportData.reportType === 0)
      reportTypeName = 'Intermediate Report';
    else if (reportData.reportType === 1)
      reportTypeName = 'Final Report';
    else if (reportData.reportType === 2)
      reportTypeName = 'Data Report';

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      reportType: reportTypeName,
      proposalId: reportData.proposalId,
      proposalTitle: title
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.SubmittedDataReportToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `${locals.reportType} Submitted - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.SubmittedDataReportToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  SubmittedIntermediateReportToInvestigator(title, user, reportData) {
    Logger.debug('EmailService.SubmittedIntermediateReportToInvestigator');
    Logger.warn(user);
    console.log('report type', reportData.reportType);
    Logger.warn(reportData);

    const template = new EmailTemplate(path.join(templatesDir, 'SubmittedIntermediateReportToInvestigator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    let reportTypeName;
    if (reportData.reportType === 1)
      reportTypeName = 'Final Report';
    else if (reportData.reportType === 0)
      reportTypeName = 'Intermediate Report';

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      reportType: reportTypeName,
      proposalId: reportData.proposalId,
      proposalTitle: title
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.SubmittedIntermediateReportToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Submitted ${locals.reportType} - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.SubmittedIntermediateReportToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  SubmittedFinalReportToInvestigator(title, user, reportData) {
    Logger.debug('EmailService.SubmittedFinalReportToInvestigator');
    Logger.warn(user);
    console.log('report type', reportData.reportType);
    Logger.warn(reportData);

    const template = new EmailTemplate(path.join(templatesDir, 'SubmittedFinalReportToInvestigator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    let reportTypeName;
    if (reportData.reportType === 1)
      reportTypeName = 'Final Report';
    else if (reportData.reportType === 0)
      reportTypeName = 'Intermediate Report';

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      reportType: reportTypeName,
      proposalId: reportData.proposalId,
      proposalTitle: title
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.SubmittedFinalReportToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Submitted ${locals.reportType} - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.SubmittedFinalReportToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  SubmittedDataReportToInvestigator(title, user, reportData) {
    Logger.debug('EmailService.SubmittedDataReportToInvestigator');
    Logger.warn(user);
    console.log('report type', reportData.reportType);
    Logger.warn(reportData);

    const template = new EmailTemplate(path.join(templatesDir, 'SubmittedDataReportToInvestigator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    let reportTypeName;
    if (reportData.reportType === 0)
      reportTypeName = 'Intermediate Report';
    else if (reportData.reportType === 1)
      reportTypeName = 'Final Report';
    else if (reportData.reportType === 2)
      reportTypeName = 'Data Report';

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      reportType: reportTypeName,
      proposalId: reportData.proposalId,
      proposalTitle: title
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.SubmittedDataReportToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `${locals.reportType} Submitted - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.SubmittedDataReportToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  /**Email after reviewers accept the proposal for review */
  AcceptedForReviewToCoordinator(user, proposal) {
    Logger.debug('EmailService.AcceptedForReviewToCoordinator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'AcceptedForReviewToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.AcceptedForReviewToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Proposal accepted for review - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.AcceptedForReviewToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  AcceptedForReviewToReviewer(user, proposal) {
    Logger.debug('EmailService.AcceptedForReviewToReviewer');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'AcceptedForReviewToReviewer-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.AcceptedForReviewToReviewer at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Proposal accepted for review - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.AcceptedForReviewToReviewer at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  rejectedForReviewToCoordinator(user, proposal) {
    Logger.debug('EmailService.RejectedForReviewToCoordinator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'RejectedForReviewToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.RejectedForReviewToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Proposal rejected for review - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.RejectedForReviewToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  rejectedForReviewToReviewer(user, proposal) {
    Logger.debug('EmailService.RejectedForReviewToReviewer');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'RejectedForReviewToReviewer-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.RejectedForReviewToReviewer at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Proposal rejected for review - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.RejectedForReviewToReviewer at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  /**Emails after the reviewers submits the review */

  ProposalReviewedToCoordinator(user, proposal) {
    Logger.debug('EmailService.ProposalReviewedToCoordinator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'ProposalReviewedToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.researchTitle,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.ProposalReviewedToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Proposal reviewed - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.ProposalReviewedToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  ProposalReviewedToReviewer(user, proposal) {
    Logger.debug('EmailService.ProposalReviewedToReviewer');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'ProposalReviewedToReviewer-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.researchTitle,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.ProposalReviewedToReviewer at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Proposal reviewed - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.ProposalReviewedToReviewer at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  ProposalApprovedToCoordinator(user, proposal) {
    Logger.debug('EmailService.ProposalApprovedToCoordinator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'ProposalApprovedToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.ProposalApprovedToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Proposal Approved - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.ProposalApprovedToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  ProposalApprovedToChair(user, proposal) {
    Logger.debug('EmailService.ProposalApprovedToChair');
    Logger.warn(user);
    Logger.warn(proposal);
    console.log('user in chair email', user)

    const template = new EmailTemplate(path.join(templatesDir, 'ProposalApprovedToChair-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.ProposalApprovedToChair at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Proposal Approved - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.ProposalApprovedToChair at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  /**Contact us emails */
  contactRequestToCoordinator(user, contactData) {
    Logger.debug('EmailService.contactRequestToCoordinator');
    Logger.verbose(contactData);
    
    const template = new EmailTemplate(path.join(templatesDir, 'ContactUsRequestToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      coordinator: `${user.firstName} ${user.lastName}`,
      name: `${contactData.firstName} ${contactData.lastName}`,
      requestType: contactData.requestType,
      email: contactData.email,
      message: contactData.message
    };
    
    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.contactRequestToCoordinator at template.render ${err}`);
        console.log('error in email service', err);
      }
      console.log('results in email', results)
      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Request received - ${locals.requestType}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.contactRequestToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  contactRequestToAdmin(user, contactData) {
    Logger.debug('EmailService.contactRequestToAdmin');
    Logger.verbose(contactData);
    console.log('contact data in email service', contactData)

    const template = new EmailTemplate(path.join(templatesDir, 'ContactUsRequestToAdmin-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      admin: `${user.firstName} ${user.lastName}`,
      name: `${contactData.firstName} ${contactData.lastName}`,
      requestType: contactData.requestType,
      email: contactData.email,
      message: contactData.message
    };
    console.log('name of admin',locals.name)
    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.contactRequestToAdmin at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Request received - ${locals.requestType}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          Logger.error(`EmailService.contactRequestToAdmin at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  sendInviteEmailToExternalUser(user) {
    Logger.debug('EmailService.sendInviteEmailToExternalUser');
    const template = new EmailTemplate(path.join(templatesDir, 'userInviteExternal-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.contactRequestToAdmin at template.render ${err}`);
        Logger.error(`EmailService.sendInviteEmailToExternalUser at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `You've received an invite from ${sails.config.stringLiterals.longProjectName}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.sendInviteEmailToExternalUser at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  emailForIntermediateReportToInvestigator(user, proposal) {
    Logger.debug('EmailService.emailForIntermediateReportToInvestigator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'IntermediateReminderToInvestigator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
      date: proposal.emailDateForIntermediateReport
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.emailForFinalReportToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Reminder for submission of intermediate report - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.emailForIntermediateReportToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  emailForFinalReportToInvestigator(user, proposal) {
    Logger.debug('EmailService.emailForFinalReportToInvestigator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'FinalReminderToInvestigator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
      date: proposal.emailDateForFinalReport
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.emailForFinalReportToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Reminder for submission of final report - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.emailForFinalReportToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  emailForIntermediateReportToCoordinator(user, proposal) {
    Logger.debug('EmailService.emailForIntermediateReportToCoordinator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'IntermediateReminderToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
      date: proposal.emailDateForIntermediateReport
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.emailForIntermediateReportToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Reminder for submission of intermediate report - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.emailForIntermediateReportToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  emailForFinalReportToCoordinator(user, proposal) {
    Logger.debug('EmailService.emailForFinalReportToCoordinator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'FinalReminderToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
      date: proposal.emailDateForFinalReport
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.emailForFinalReportToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Reminder for submission of final report - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.emailForFinalReportToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  /**Proposal withdraw emails */
  withdrawProposalEmailToCoordinator(user, proposal) {
    Logger.debug('EmailService.withdrawProposalEmailToCoordinator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'WithdrawProposalToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.withdrawProposalEmailToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Withdrawn the proposal - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.withdrawProposalEmailToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  withdrawProposalEmailToInvestigator(user, proposal) {
    Logger.debug('EmailService.withdrawProposalEmailToInvestigator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'WithdrawProposalToInvestigator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.withdrawProposalEmailToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Withdrawn the proposal - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.withdrawProposalEmailToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  //withdrow amendment request
  withdrawAmendmentEmailToCoordinator(user,proposal){
    Logger.debug('EmailService.withdrawAmendmentEmailToCoordinator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'WithdrawAmendmentToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.withdrawAmendmentEmailToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Withdrawn the amendment - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.withdrawAmendmentEmailToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  withdrawAmendmentEmailToInvestigator(user,proposal){
    Logger.debug('EmailService.withdrawAmendmentEmailToInvestigator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'WithdrawAmendmentToInvestigator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.withdrawAmendmentEmailToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Withdrawn the amendment - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.withdrawAmendmentEmailToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  /**Term extension emails */
  requestTermExtensionEmailToCoordinator(user, proposal) {
    Logger.debug('EmailService.requestTermExtensionEmailToCoordinator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'RequestTermExtensionToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.requestTermExtensionEmailToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Received request for term extension - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.requestTermExtensionEmailToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  requestTermExtensionEmailToInvestigator(user, proposal) {
    Logger.debug('EmailService.requestTermExtensionEmailToInvestigator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'RequestTermExtensionToInvestigator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.requestTermExtensionEmailToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Submitted request for term extension - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.requestTermExtensionEmailToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  sendEmailForQuaterlyReportSubmitted(user) {
    Logger.debug('EmailService.sendEmailForQuaterlyReportSubmitted');
    Logger.warn(user);

    const template = new EmailTemplate(path.join(templatesDir, 'submitQuarterly-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.sendEmailForQuaterlyReportSubmitted at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: 'Submitted the quarterly report',
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.sendEmailForQuaterlyReportSubmitted at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  sendEmailForAnnualReportSubmitted(user) {
    Logger.debug('EmailService.sendEmailForAnnualReportSubmitted');
    Logger.warn(user);

    const template = new EmailTemplate(path.join(templatesDir, 'submitAnnual-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.sendEmailForAnnualReportSubmitted at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: 'Submitted an annual report',
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.sendEmailForAnnualReportSubmitted at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  sendEmailForQuaterlyReportReceived(user) {
    Logger.debug('EmailService.sendEmailForQuaterlyReportReceived');
    Logger.warn(user);

    const template = new EmailTemplate(path.join(templatesDir, 'recievedQuarterly-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.sendEmailForQuaterlyReportReceived at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: 'Received the quarterly report',
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.sendEmailForQuaterlyReportReceived at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  sendEmailForAnnualReportReceived(user) {
    Logger.debug('EmailService.sendEmailForAnnualReportReceived');
    Logger.warn(user);

    const template = new EmailTemplate(path.join(templatesDir, 'recievedAnnual-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.sendEmailForAnnualReportReceived at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: 'Received an annual report',
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.sendEmailForAnnualReportReceived at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  announcementAddedEmailToAdmin(admin, announcement) {
    Logger.debug('EmailService.announcementAddedEmailToAdmin');

    const template = new EmailTemplate(path.join(templatesDir, 'AddedAnnouncement-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      adminName:`${admin.firstName} ${admin.lastName}`,
      title: announcement.title,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.announcementAddedEmailToAdmin at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: `${admin.email}`,
        subject: 'Added an announcement' ,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.announcementAddedEmailToAdmin at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  announcementAddedEmailToCoordinator(coordinator, announcement) {
    Logger.debug('EmailService.announcementAddedEmailToAdminAndCoordinator');

    const template = new EmailTemplate(path.join(templatesDir, 'AddedAnnouncement-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      coordinatorName: `${coordinator.firstName} ${coordinator.lastName}`,
      title: announcement.title,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.announcementAddedEmailToAdminAndCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: `${coordinator.email}`,
        subject: 'Added an announcement' ,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.announcementAddedEmailToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  announcementDeletedEmailToAdmin(admin, announcement) {
    Logger.debug('EmailService.announcementDeletedEmailToAdminAndCoordinator');

    const template = new EmailTemplate(path.join(templatesDir, 'DeletedAnnouncement-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      title: announcement.title,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.announcementDeletedEmailToAdminAndCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: `${admin.email}`,
        subject: `Deleted an announcement with title ${announcement.title}` ,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.announcementDeletedEmailToAdminAndCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  announcementDeletedEmailToCoordinator(coordinator, announcement) {
    Logger.debug('EmailService.announcementDeletedEmailToCoordinator');

    const template = new EmailTemplate(path.join(templatesDir, 'DeletedAnnouncement-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      title: announcement.title,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.announcementDeletedEmailToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: `${coordinator.email}`,
        subject: `Deleted an announcement with title ${announcement.title}` ,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.announcementDeletedEmailToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  announcementEditedEmailToAdmin(admin, announcement) {
    Logger.debug('EmailService.announcementEditedEmailToAdminAndCoordinator');

    const template = new EmailTemplate(path.join(templatesDir, 'EditedAnnouncement-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      title: announcement.title,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.announcementEditedEmailToAdmin at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: `${admin.email}`,
        subject: `Edited an announcement with title ${announcement.title}` ,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.announcementEditedEmailToAdmin at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  announcementEditedEmailToCoordinator(coordinator, announcement) {
    Logger.debug('EmailService.announcementEditedEmailToCoordinator');

    const template = new EmailTemplate(path.join(templatesDir, 'EditedAnnouncement-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      title: announcement.title,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.announcementEditedEmailToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: `${coordinator.email}`,
        subject: `Edited an announcement with title ${announcement.title}` ,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.announcementEditedEmailToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  /**Data request emails */
  requestedDataToRequester(email, data) {
    Logger.debug('EmailService.requestedDataToRequester');
    Logger.warn(data);

    const template = new EmailTemplate(path.join(templatesDir, 'DataRequestEmailToRequester-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${data.fullName}`,
      docketNo: `${data.docketNo}`,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.requestedDataToRequester at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: email,
        subject: 'Data request sent',
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.requestedDataToRequester at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  requestedDataToSeniorStatistician(user, data) {
    Logger.debug('EmailService.requestedDataToSeniorStatistician');
    Logger.warn(data);
    Logger.warn(user);

    const template = new EmailTemplate(path.join(templatesDir, 'DataRequestEmailToSeniorStatistician-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      docketNo: `${data.docketNo}`,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.requestedDataToSeniorStatistician at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: 'Data request received',
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.requestedDataToSeniorStatistician at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  sendAnnualReportReminder(universityUsers) {
    Logger.debug('EmailService.sendAnnualReportReminder');

    const template = new EmailTemplate(path.join(templatesDir, 'AnnualReportUU-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.sendAnnualReportReminder at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: universityUsers,
        subject: 'Reminder to submit annual report',
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.sendAnnualReportReminder at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  sendQuarterlyReportReminder(universityUsers) {
    Logger.debug('EmailService.sendQuarterlyReportReminder');

    const template = new EmailTemplate(path.join(templatesDir, 'QuarterlyReportUU-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.sendQuarterlyReportReminder at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: universityUsers,
        subject: 'Reminder to submit quarterly report',
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.sendQuarterlyReportReminder at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  markResearchProposalEmailToInvestigator(user, proposal) {
    Logger.debug('EmailService.markResearchProposalEmailToInvestigator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'MarkedProposalAsResearch-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.markResearchProposalEmailToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Proposal marked as Research - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.markResearchProposalEmailToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  markResearchProposalEmailToCoordinator(user, proposal) {
    Logger.debug('EmailService.markResearchProposalEmailToCoordinator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'MarkedProposalAsResearchToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.markResearchProposalEmailToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Amendment request rejected - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'COA-MoHMS_Final.png',
          path: `${__dirname}/templates/assets/COA-MoHMS_Final.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.markIncompleteAmendmentEmailToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  markResearchProposalEmailToChair(user, proposal) {
    Logger.debug('EmailService.markResearchProposalEmailToChair');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'MarkProposalAsResearchChair-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.markResearchProposalEmailToChair at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Proposal marked as Research - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.markResearchProposalEmailToChair at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  submittedAmendmentRequestToInvestigator(user, proposal){
    Logger.debug('EmailService.submittedAmendmentRequestToInvestigator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'SubmittedAmendmentToInvestigator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.submittedAmendmentRequestToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Submitted amendment - ${locals.proposalId}`,
        html: results.html,
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.submittedAmendmentRequestToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  markCompleteAmendmentEmailToCoordinator(user, proposal){
    Logger.debug('EmailService.markCompleteAmendmentEmailToCoordinator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'MarkCompletedAmendmentToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.markCompleteAmendmentEmailToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Amendment request accepted - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.markCompleteAmendmentEmailToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  markCompleteAmendmentEmailToInvestigator(user, proposal){
    Logger.debug('EmailService.markCompleteAmendmentEmailToInvestigator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'MarkCompletedAmendmentToInvestigator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.markCompleteAmendmentEmailToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Amendment request accepted - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.markCompleteAmendmentEmailToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  markIncompleteAmendmentEmailToInvestigator(user, proposal){
    Logger.debug('EmailService.markIncompleteAmendmentEmailToInvestigator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'MarkIncompletedAmendmentToInvestigator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.markIncompleteAmendmentEmailToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Amendment request rejected - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.markIncompleteAmendmentEmailToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  markIncompleteAmendmentEmailToCoordinator(user, proposal){
    Logger.debug('EmailService.markIncompleteAmendmentEmailToCoordinator');
    Logger.warn(user);
    Logger.warn(proposal);

    const template = new EmailTemplate(path.join(templatesDir, 'MarkIncompletedAmendmentToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: proposal.title,
      proposalId: proposal.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.markIncompleteAmendmentEmailToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Amendment request rejected - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.markIncompleteAmendmentEmailToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  
  
  refferedToEmail(user, dataRequest) {
    Logger.debug('EmailService.refferedToEmail');
    const template = new EmailTemplate(path.join(templatesDir, 'refferedTo-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });
    let locals;
    if(dataRequest.refferedToPSHMS){
       locals = {
        refferedBy: sails.config.stringLiterals[dataRequest.refferedByHead],
        fullProjectName: sails.config.stringLiterals.fullProjectName,
        shortProjectName: sails.config.stringLiterals.shortProjectName,
        docketNo: dataRequest.docketNo,
        refferedTo: sails.config.stringLiterals[dataRequest.refferedToPSHMS],
      }
    }
    else{
       locals = {
        refferedBy: sails.config.stringLiterals[dataRequest.refferedBy],
        fullProjectName: sails.config.stringLiterals.fullProjectName,
        shortProjectName: sails.config.stringLiterals.shortProjectName,
        docketNo: dataRequest.docketNo,
        refferedTo: sails.config.stringLiterals[dataRequest.refferedTo],
      };
    }
    
   
    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.refferedToEmail at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Referred Data request - ${dataRequest.docketNo}`,
        html: results.html,
        //html: 'Embedded image: <img src="cid:fiji-logo"/>',   
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.refferedToEmail at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  refferedByEmail(user, dataRequest) {
    Logger.debug('EmailService.refferedByEmail');

    const template = new EmailTemplate(path.join(templatesDir, 'refferedBy-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    let locals;
    if(dataRequest.refferedToPSHMS){
       locals = {
        refferedBy: sails.config.stringLiterals[dataRequest.refferedByHead],
        fullProjectName: sails.config.stringLiterals.fullProjectName,
        shortProjectName: sails.config.stringLiterals.shortProjectName,
        docketNo: dataRequest.docketNo,
        refferedTo: sails.config.stringLiterals[dataRequest.refferedToPSHMS],
      }
    }
    else{
       locals = {
        refferedBy: sails.config.stringLiterals[dataRequest.refferedBy],
        fullProjectName: sails.config.stringLiterals.fullProjectName,
        shortProjectName: sails.config.stringLiterals.shortProjectName,
        docketNo: dataRequest.docketNo,
        refferedTo: sails.config.stringLiterals[dataRequest.refferedTo],
      };
    }
    

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.refferedByEmail at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Referred Data request - ${dataRequest.docketNo}`,
        html: results.html,
        //html: 'Embedded image: <img src="cid:fiji-logo"/>',   
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.refferedByEmail at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },


  markCompleteDataRequestToRequestor(user){
    Logger.debug(user)
    Logger.debug('EmailService.markCompleteDataRequestToRequestor');
   

    const template = new EmailTemplate(path.join(templatesDir, 'completeRequest-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.fullName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      docketNo: user.docketNo,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.markCompleteDataRequestToRequestor at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Data request is accepted - ${locals.docketNo}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.markCompleteDataRequestToRequestor at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  markCompleteDataRequestToSeniorStatisticion(user,dataRequest){
    Logger.debug(user)
    Logger.debug('EmailService.markCompleteDataRequestToSeniorStatisticion');
   

    const template = new EmailTemplate(path.join(templatesDir, 'completeRequestSS-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${dataRequest.fullName}`,
      id: dataRequest.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      docketNo: dataRequest.docketNo,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.markCompleteDataRequestToSeniorStatisticion at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Data request marked as complete - ${locals.docketNo}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.markCompleteDataRequestToRequestor at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },

  markInCompleteDataRequestToRequestor(user){
    Logger.debug(user)
    Logger.debug('EmailService.markInCompleteDataRequestToRequestor');
   

    const template = new EmailTemplate(path.join(templatesDir, 'incompleteRequest-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.fullName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      docketNo: user.docketNo,
      commentForMarkInComplete:user.commentForMarkInComplete
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.markInCompleteDataRequestToRequestor at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Data request is rejected - ${locals.docketNo}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.markInCompleteDataRequestToRequestor at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  markInCompleteDataRequestToSeniorStatisticion(user, dataRequest){
    Logger.debug(user)
    Logger.debug('EmailService.markInCompleteDataRequestToSeniorStatisticion');
   

    const template = new EmailTemplate(path.join(templatesDir, 'incompleteRequestSS-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${dataRequest.fullName}`,
      id: dataRequest.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      docketNo: dataRequest.docketNo,
      
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.markInCompleteDataRequestToSeniorStatisticion at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Data request marked as incomplete - ${locals.docketNo}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.markInCompleteDataRequestToSeniorStatisticion at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  approvedDataRequestToRequestor(user){
    Logger.debug('EmailService.approvedDataRequestToRequestor');

    const template = new EmailTemplate(path.join(templatesDir, 'approveRequest-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.fullName} `,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      docketNo: user.docketNo,
      commentForApproved:user.commentForApproved
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.approvedDataRequestToRequestor at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Data request is approved - ${locals.docketNo}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.approvedDataRequestToRequestor at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  approvedDataRequestToSeniorStatisticion(user,dataRequest){
    Logger.debug('EmailService.approvedDataRequestToSeniorStatisticion');

    const template = new EmailTemplate(path.join(templatesDir, 'approveRequestSS-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${dataRequest.fullName} `,
      id: dataRequest.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      docketNo: dataRequest.docketNo,
     
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.approvedDataRequestToSeniorStatisticion at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Data request is approved  - ${locals.docketNo}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.approvedDataRequestToSeniorStatisticion at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  rejectedDataRequestToRequestor(user){
    Logger.debug('EmailService.rejectedDataRequestToRequestor');

    const template = new EmailTemplate(path.join(templatesDir, 'rejectRequest-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.fullName} `,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      docketNo: user.docketNo,
      commentForRejected:user.commentForRejected
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.rejectedDataRequestToRequestor at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Data request is rejected - ${locals.docketNo}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.rejectedDataRequestToRequestor at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  rejectedDataRequestToSeniorStatisticion(user,dataRequest){
    Logger.debug('EmailService.rejectedDataRequestToSeniorStatisticion');

    const template = new EmailTemplate(path.join(templatesDir, 'rejectRequestSS-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${dataRequest.fullName} `,
      id: dataRequest.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      docketNo: dataRequest.docketNo,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.rejectedDataRequestToSeniorStatisticion at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Data request is rejected - ${locals.docketNo}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.rejectedDataRequestToSeniorStatisticion at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });

  },
  emailForReminderToSeniorStatistician(user,dataRequest){
    Logger.debug('EmailService.emailForReminderToSeniorStatistician');
   
      const template = new EmailTemplate(path.join(templatesDir, 'reminderToSS-email'));
      const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: noreplyEmail,
          pass: noreplyEmailPass,
        },
      });
  
      const locals = {
        name: `${dataRequest.fullName} `,
        id: dataRequest.id,
        fullProjectName: sails.config.stringLiterals.fullProjectName,
        shortProjectName: sails.config.stringLiterals.shortProjectName,
        docketNo: dataRequest.docketNo,
      };
  
      template.render(locals, (err, results) => {
        if (err) {
          Logger.error(`EmailService.emailForReminderToSeniorStatistician at template.render ${err}`);
        }
  
        transport.sendMail({
          from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
          to: user.email,
          subject: `Reminder to respond on data request - ${locals.docketNo}`,
          html: results.html,
          attachments: [{
            filename: 'fiji_logoSmall.png',
            path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
            cid: 'fiji-logo' //same cid value as in the html img src
        }],
          text: results.text,
        }, (transportErr, responseStatus) => {
          if (transportErr) {
            return Logger.error(`EmailService.emailForReminderToSeniorStatistician at transport.sendMail ${transportErr}`);
          }
          return Logger.verbose(responseStatus);
        });
      });
   
  },
  approvedDataByPSHMSToPSHMS(user,dataRequest){
    Logger.debug('EmailService.approvedDataByPSHMSToPSHMS');

    const template = new EmailTemplate(path.join(templatesDir, 'approveRequestPSHMS-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${dataRequest.fullName} `,
      id: dataRequest.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      docketNo: dataRequest.docketNo,
     
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.approvedDataByPSHMSToPSHMS at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Approved the data request  - ${locals.docketNo}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.approvedDataByPSHMSToPSHMS at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  approvedDataByPSHMSToSeniorStatisticion(user,dataRequest){
    Logger.debug('EmailService.approvedDataByPSHMSToSeniorStatisticion');

    const template = new EmailTemplate(path.join(templatesDir, 'approveRequestPSHMSToSS-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${dataRequest.fullName} `,
      id: dataRequest.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      docketNo: dataRequest.docketNo,
      commentByPSHMSForApproved:dataRequest.commentByPSHMSForApproved
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.approvedDataByPSHMSToSeniorStatisticion at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Approved the data request  - ${locals.docketNo}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.approvedDataByPSHMSToSeniorStatisticion at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  rejectedDataByPSHMSToPSHMS(user,dataRequest){
    Logger.debug('EmailService.rejectedDataByPSHMSToPSHMS');

    const template = new EmailTemplate(path.join(templatesDir, 'rejectRequestPSHMS-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${dataRequest.fullName} `,
      id: dataRequest.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      docketNo: dataRequest.docketNo,
      
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.rejectedDataByPSHMSToPSHMS at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Rejected the data request  - ${locals.docketNo}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.rejectedDataByPSHMSToPSHMS at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  rejectedDataByPSHMSToSeniorStatisticion(user,dataRequest){
    Logger.debug('EmailService.rejectedDataByPSHMSToSeniorStatisticion');

    const template = new EmailTemplate(path.join(templatesDir, 'rejectRequestPSHMSToSS-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${dataRequest.fullName} `,
      id: dataRequest.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      docketNo: dataRequest.docketNo,
      commentByPSHMSForRejected:dataRequest.commentByPSHMSForRejected
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.rejectedDataByPSHMSToSeniorStatisticion at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Rejected the data request  - ${locals.docketNo}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.rejectedDataByPSHMSToSeniorStatisticion at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  emailForReminderToPSHMS(user,dataRequest){
    Logger.debug('EmailService.emailForReminderToPSHMS');
   
      const template = new EmailTemplate(path.join(templatesDir, 'reminderToPSHMS-email'));
      const transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: noreplyEmail,
          pass: noreplyEmailPass,
        },
      });
  
      const locals = {
        name: `${dataRequest.fullName} `,
        id: dataRequest.id,
        fullProjectName: sails.config.stringLiterals.fullProjectName,
        shortProjectName: sails.config.stringLiterals.shortProjectName,
        docketNo: dataRequest.docketNo,
      };
  
      template.render(locals, (err, results) => {
        if (err) {
          Logger.error(`EmailService.emailForReminderToPSHMS at template.render ${err}`);
        }
  
        transport.sendMail({
          from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
          to: user.email,
          subject: `Reminder to respond on data request - ${locals.docketNo}`,
          html: results.html,
          attachments: [{
            filename: 'fiji_logoSmall.png',
            path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
            cid: 'fiji-logo' //same cid value as in the html img src
        }],
          text: results.text,
        }, (transportErr, responseStatus) => {
          if (transportErr) {
            return Logger.error(`EmailService.emailForReminderToPSHMS at transport.sendMail ${transportErr}`);
          }
          return Logger.verbose(responseStatus);
        });
      });
   
  },
  approvedDataByHoRIDAMITToHoRIDAMIT(user,dataRequest){
    Logger.debug('EmailService.approvedDataByHoRIDAMITToHoRIDAMIT');

    const template = new EmailTemplate(path.join(templatesDir, 'approveRequestHoRIDMIT-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${dataRequest.fullName} `,
      id: dataRequest.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      docketNo: dataRequest.docketNo,
     
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.approvedDataByHoRIDAMITToHoRIDAMIT at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Approved the data request  - ${locals.docketNo}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.approvedDataByHoRIDAMITToHoRIDAMIT at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  approvedDataByHoRIDAMITToSeniorStatisticion(user,dataRequest){
    Logger.debug('EmailService.approvedDataByHoRIDAMITToSeniorStatisticion');

    const template = new EmailTemplate(path.join(templatesDir, 'approveRequestHoRIDMITToSS-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${dataRequest.fullName} `,
      id: dataRequest.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      docketNo: dataRequest.docketNo,
      commentForApproved:dataRequest.commentByHoRIDAMITForApproved
     
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.approvedDataByHoRIDAMITToSeniorStatisticion at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Approved the data request  - ${locals.docketNo}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.approvedDataByHoRIDAMITToSeniorStatisticion at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  rejectedDataByHoRIDAMITToHoRIDAMIT(user,dataRequest){
    Logger.debug('EmailService.rejectedDataByHoRIDAMITToHoRIDAMIT');

    const template = new EmailTemplate(path.join(templatesDir, 'rejectRequestToHoRIDAMIT-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${dataRequest.fullName} `,
      id: dataRequest.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      docketNo: dataRequest.docketNo,
      
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.rejectedDataByHoRIDAMITToHoRIDAMIT at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Rejected the data request  - ${locals.docketNo}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.rejectedDataByHoRIDAMITToHoRIDAMIT at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  rejectedDataByHoRIDAMITToSeniorStatisticion(user,dataRequest){
    Logger.debug('EmailService.rejectedDataByHoRIDAMITToSeniorStatisticion');

    const template = new EmailTemplate(path.join(templatesDir, 'rejectRequestHoRIDAMITToSS-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${dataRequest.fullName} `,
      id: dataRequest.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      docketNo: dataRequest.docketNo,
      commentByHoRIDAMITForRejected:dataRequest.commentByHoRIDAMITForRejected
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.rejectedDataByHoRIDAMITToSeniorStatisticion at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Rejected the data request  - ${locals.docketNo}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.rejectedDataByHoRIDAMITToSeniorStatisticion at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  emailForReminderToHead(user,dataRequest){
    Logger.debug('EmailService.emailForReminderToHead');
   
    const template = new EmailTemplate(path.join(templatesDir, 'reminderToHead-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${dataRequest.fullName} `,
      id: dataRequest.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      docketNo: dataRequest.docketNo,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.emailForReminderToHead at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Reminder to respond on data request - ${locals.docketNo}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.emailForReminderToHead at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
    
  },
  sendNotificationToSS(user,dataRequests){
    Logger.debug('EmailService.sendNotificationToSS');
   
    const template = new EmailTemplate(path.join(templatesDir, 'notificationToSS-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      dataRequests: dataRequests,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.sendNotificationToSS at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `List of data requests under review`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.sendNotificationToSS at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });

  },
  forwardTermExtensionEmailToChair(user,proposal){
    Logger.debug('EmailService.forwardTermExtensionEmailToChair');
   
    const template = new EmailTemplate(path.join(templatesDir, 'forwardExtensionToChair-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposal: proposal,
      proposalId:proposal.proposalId,
      proposalTitle:proposal.title,
      comment:proposal.termExtensionForwardComment
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.forwardTermExtensionEmailToChair at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Received a term extension request - ${proposal.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.forwardTermExtensionEmailToChair at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });

  },
  forwardTermExtensionEmailToCoordinator(user,proposal){
    Logger.debug('EmailService.forwardTermExtensionEmailToCoordinator');
   
    const template = new EmailTemplate(path.join(templatesDir, 'forwardExtensionToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposal: proposal,
      proposalId:proposal.proposalId,
      proposalTitle:proposal.title
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.forwardTermExtensionEmailToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Term extension forwarded to the chair - ${proposal.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.forwardTermExtensionEmailToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
    
  },
  approvedTermExtenstionToCoordinator(user,proposal){
    Logger.debug('EmailService.approvedTermExtenstionToCoordinator');
   
    const template = new EmailTemplate(path.join(templatesDir, 'approvedExtensionToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposal: proposal,
      proposalId:proposal.proposalId,
      proposalTitle:proposal.title,
      comment:proposal.commentForApprovedTermExtension
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.approvedTermExtenstionToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Feedback on term extension - ${proposal.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.approvedTermExtenstionToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
    
  },
  approvedTermExtenstionToChair(user,proposal){
    Logger.debug('EmailService.approvedTermExtenstionToChair');
   
    const template = new EmailTemplate(path.join(templatesDir, 'approvedExtensionToChair-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposal: proposal,
      proposalId:proposal.proposalId,
      proposalTitle:proposal.title
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.approvedTermExtenstionToChair at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Submitted feedback on term extension - ${proposal.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.approvedTermExtenstionToChair at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
    
  },
  
  rejectedTermExtenstionToCoordinator(user,proposal){
    Logger.debug('EmailService.rejectedTermExtenstionToCoordinator');
   
    const template = new EmailTemplate(path.join(templatesDir, 'rejectedExtensionToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposal: proposal,
      proposalId:proposal.proposalId,
      proposalTitle:proposal.title,
      comment:proposal.commentForRejectedTermExtension
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.rejectedTermExtenstionToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Feedback on term extension - ${proposal.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.rejectedTermExtenstionToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
   
  },
  rejectedTermExtenstionToChair(user,proposal){
    Logger.debug('EmailService.rejectedTermExtenstionToChair');
   
    const template = new EmailTemplate(path.join(templatesDir, 'rejectedExtensionToChair-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposal: proposal,
      proposalId:proposal.proposalId,
      proposalTitle:proposal.title
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.rejectedTermExtenstionToChair at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Submitted feedback on term extension - ${proposal.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.rejectedTermExtenstionToChair at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
   
  },
  forwardResponseExtenstionToCoordinator(user,proposal){
    Logger.debug('EmailService.forwardResponseExtenstionToCoordinator');
   
    const template = new EmailTemplate(path.join(templatesDir, 'responseExtensionToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposal: proposal,
      proposalId:proposal.proposalId,
      proposalTitle:proposal.title
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.forwardResponseExtenstionToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Feedback sent on term extension - ${proposal.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.forwardResponseExtenstionToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  forwardResponseExtenstionToInvestigator(user,proposal){
    Logger.debug('EmailService.forwardResponseExtenstionToInvestigator');
   
    const template = new EmailTemplate(path.join(templatesDir, 'responseExtensionToInvestigator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposal: proposal,
      proposalId:proposal.proposalId,
      proposalTitle:proposal.title,
      commentForApproval:proposal.commentForResponseToInvestigator
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.forwardResponseExtenstionToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Feedback on term extension - ${proposal.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.forwardResponseExtenstionToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  rejectAmendmentEmailToInvestigator(user,amendment){
    Logger.debug('EmailService.rejectAmendmentEmailToInvestigator');
    const rejectComment=amendment.rejectComment?amendment.rejectComment:amendment.commentForApproveReject
    const template = new EmailTemplate(path.join(templatesDir, 'rejectAmendmentToInvestigator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: amendment.title,
      referenceNumber: amendment.proposalId,
      comment: rejectComment
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.rejectAmendmentEmailToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Amendment request is rejected - ${amendment.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.rejectAmendmentEmailToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  rejectAmendmentEmailToCoordinator(user,amendment){
    Logger.debug('EmailService.rejectAmendmentEmailToCoordinator');
    const rejectComment=amendment.rejectComment?amendment.rejectComment:amendment.commentForApproveReject
    const template = new EmailTemplate(path.join(templatesDir, 'rejectAmendmentToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: amendment.title,
      referenceNumber: amendment.proposalId,
      comment: rejectComment
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.rejectAmendmentEmailToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Amendment request is rejected - ${amendment.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.rejectAmendmentEmailToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  amendmentApprovedToCoordinator(user,amendment){
    Logger.debug('EmailService.amendmentApprovedToCoordinator');
    Logger.warn(user);

    const template = new EmailTemplate(path.join(templatesDir, 'amendmentApprovedToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: amendment.title,
      proposalId: amendment.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.amendmentApprovedToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Amendment Approved - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.amendmentApprovedToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  amendmentApprovedToChair(user,amendment){
    Logger.debug('EmailService.amendmentApprovedToChair');
    Logger.warn(user);
    console.log('user in chair email', user)

    const template = new EmailTemplate(path.join(templatesDir, 'amendmentApprovedToChair-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: amendment.title,
      proposalId: amendment.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.amendmentApprovedToChair at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Amendment Approved - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],     
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.amendmentApprovedToChair at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  markResearchAmendmentEmailToChair(user,amendment){
    Logger.debug('EmailService.markResearchAmendmentEmailToChair');
    Logger.warn(user);
    

    const template = new EmailTemplate(path.join(templatesDir, 'MarkedAmendmentAsResearchToChair-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: amendment.title,
      proposalId: amendment.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.markResearchAmendmentEmailToChair at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Amendment approved for research - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],   
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.markResearchAmendmentEmailToChair at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  markResearchAmendmentEmailToCoordinator(user,amendment){
    Logger.debug('EmailService.markResearchAmendmentEmailToCoordinator');
    Logger.warn(user);
    
    const template = new EmailTemplate(path.join(templatesDir, 'MarkedAmendmentAsResearchToCoordinator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: amendment.title,
      proposalId: amendment.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.markResearchAmendmentEmailToCoordinator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Amendment approved for research - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],   
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.markResearchAmendmentEmailToCoordinator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  },
  markResearchAmendmentEmailToInvestigator(user,amendment){
    Logger.debug('EmailService.markResearchAmendmentEmailToInvestigator');
    Logger.warn(user);
    
    const template = new EmailTemplate(path.join(templatesDir, 'MarkedAmendmentAsResearchToInvestigator-email'));
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: noreplyEmail,
        pass: noreplyEmailPass,
      },
    });

    const locals = {
      name: `${user.firstName} ${user.lastName}`,
      id: user.id,
      fullProjectName: sails.config.stringLiterals.fullProjectName,
      shortProjectName: sails.config.stringLiterals.shortProjectName,
      proposalTitle: amendment.title,
      proposalId: amendment.proposalId,
    };

    template.render(locals, (err, results) => {
      if (err) {
        Logger.error(`EmailService.markResearchAmendmentEmailToInvestigator at template.render ${err}`);
      }

      transport.sendMail({
        from: `${sails.config.stringLiterals.shortProjectName} ${noreplyEmail}`,
        to: user.email,
        subject: `Amendment approved for research - ${locals.proposalId}`,
        html: results.html,
        attachments: [{
          filename: 'fiji_logoSmall.png',
          path: `${__dirname}/templates/assets/fiji_logoSmall.png`,
          cid: 'fiji-logo' //same cid value as in the html img src
      }],   
        text: results.text,
      }, (transportErr, responseStatus) => {
        if (transportErr) {
          return Logger.error(`EmailService.markResearchAmendmentEmailToInvestigator at transport.sendMail ${transportErr}`);
        }
        return Logger.verbose(responseStatus);
      });
    });
  }
};

