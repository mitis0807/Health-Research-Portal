const Agenda = require("agenda").default; // or .Agenda
const mongoConnectionString = "mongodb://mongoDB/FijiHRP";

const agenda = new Agenda({ db: { address: mongoConnectionString } });

agenda.define('fullReviewEndingEmail', async (job) => {
  console.log('schedular running');
  console.log(job.attrs.data);
  // get coordinator email-----
  EmailService.sendExpeditedReviewEndReminderToReviewer(job.attrs.data. assignedReviewers,job.attrs.data);
});
agenda.define('expeditedReviewEndingEmail', async (job) => {
  Logger.debug('schedular running for expeditedReviewEndingEmail');
  Logger.verbose(job.attrs.data);
  // get rreviewers email-----
 EmailService.sendExpeditedReviewEndReminderToReviewers(job.attrs.data.assignedReviewers, job.attrs.data);
});
agenda.define('emailForIntermediateReport', async (job) => {
 EmailService.emailForIntermediateReportToInvestigator(job.attrs.data[0], job.attrs.data[1]);
  InternalUser.findActiveByCriteria({ isActive: true, role: 2, isVerified : true}, (err, coordinator) => {
    if (err) {
      Logger.error(`AgendaService.emailForIntermediateReport at InternalUser.findActiveByCriteria ${err}`);
    } else {
      EmailService.emailForIntermediateReportToCoordinator(coordinator, job.attrs.investigator[1]);
    }
  }
  );
});
agenda.define("emailForFinalReport", async (job) => {
  EmailService.emailForFinalReportToInvestigator(
    job.attrs.data[0],
    job.attrs.data[1]
  );
  InternalUser.findActiveByCriteria(
    { isActive: true, role: 2, isVerified: true },
    (err, coordinator) => {
      if (err) {
        Logger.error(
          `AgendaService.emailForFinalReportToInvestigator at InternalUser.findActiveByCriteria ${err}`
        );
      } else {
        EmailService.emailForFinalReportToCoordinator(
          coordinator,
          job.attrs.investigator[1]
        );
      }
    }
  );
});
agenda.define("sendAnnualReportReminder", async (job) => {
  console.log("schedular running annual");
  // get all university users email
  InternalUser.findEmailByCriteria({ role: 7 }, (err, universityUsers) => {
    if (err) {
      Logger.error(
        `AgendaService.sendAnnualReportReminder at InternalUser.findEmailByCriteria ${err}`
      );
      callback(err);
    } else {
      let recipients = "";
      universityUsers.forEach(function (v) {
        recipients += "," + v.email;
      });
      Logger.verbose(recipients);
      if (universityUsers.length > 0) {
        EmailService.sendAnnualReportReminder(recipients);
      }
    }
  });
});
agenda.define("sendQuarterlyReportReminder", async (job) => {
  // get all university users email
  InternalUser.findEmailByCriteria({ role: 7 }, (err, universityUsers) => {
    if (err) {
      Logger.error(
        `AgendaService.sendQuarterlyReportReminder at InternalUser.findEmailByCriteria ${err}`
      );
      callback(err);
    } else {
      let recipients = "";
      universityUsers.forEach(function (v) {
        recipients += "," + v.email;
      });
      Logger.verbose(recipients);
      if (universityUsers.length > 0) {
        EmailService.sendQuarterlyReportReminder(recipients);
      }
    }
  });
});
agenda.define("emailForDataRequestReminder", async (job) => {
 console.log('emailForData')
 InternalUser.findActiveByCriteria({ isActive: true, role: 8, isVerified : true}, (err, seniorStatistician) => {
  if (err) {
    Logger.error(`AgendaService.emailForDataRequestReminder at InternalUser.findActiveByCriteria ${err}`);
  } else {
      EmailService.emailForReminderToSeniorStatistician(seniorStatistician, job.attrs.data);  
    
  }
}
);
});
agenda.define("emailForReminderToPSHMS", async (job) => {
  InternalUser.findActiveByCriteria({ isActive: true, role: 9, isVerified : true}, (err, PSHMS) => {
   if (err) {
     Logger.error(`AgendaService.emailForReminderToPSHMS at InternalUser.findActiveByCriteria ${err}`);
   } else {
       EmailService.emailForReminderToPSHMS(PSHMS, job.attrs.data);      
   }
 }
 );
 });
 agenda.define("emailForReminderToHead", async (job) => {
  InternalUser.findActiveByCriteria({ isActive: true, role: 10, isVerified : true}, (err, Head) => {
   if (err) {
     Logger.error(`AgendaService.emailForReminderToHead at InternalUser.findActiveByCriteria ${err}`);
   } else {
       EmailService.emailForReminderToHead(Head, job.attrs.data);      
   }
 }
 );
 });
 
 agenda.define("sendNotificationToSS",async (job)=>{
  job.repeatEvery('1 month', {
    skipImmediate: true
     });
    await job.save()
  InternalUser.findActiveByCriteria({ isActive: true, role: 8, isVerified : true}, (err, seniorStatistician) => {
    if (err) {
      Logger.error(
        `AgendaService.sendNotificationToSS at DataRequest.findActiveByCriteria ${err}`
      );
      callback(err);
    } else {
     DataRequest.findData({isCompleted:true,isApproved:false,isRejected:false},(error,results)=>{
       if(error){
        Logger.error(
          `AgendaService.sendNotificationToSS at DataRequest.findData ${error}`
        );
       }
       if(results.length!=0){
        EmailService.sendNotificationToSS(seniorStatistician,results);
       }
     })
    }
  });
 })
  module.exports = {
      async startAgenda(data,date) {
          await agenda.start();
        console.log('schedular to run in one min');
          await agenda.schedule(date, 'fullReviewEndingEmail',data);
        },
        async startAgendaForExpeditedReviewReminder(data,date) {
          await agenda.start();
          Logger.debug('schedular for startAgendaForExpeditedReviewReminder to run in one min');
          await agenda.schedule(date, 'expeditedReviewEndingEmail',data);
        },
      async reportReminderAgenda(updatedProposal, investigator) {
        await agenda.start();
      console.log('schedular to run in one min');
        const data=[investigator, updatedProposal]
        await agenda.schedule(updatedProposal.emailDateForIntermediateReport, 'emailForIntermediateReport',data);
        await agenda.schedule(updatedProposal.emailDateForFinalReport, 'emailForFinalReport',data);

      },
      async startAgendaForDataRequestReminder(reminderDate,dataRequest) {
        await agenda.start();
        console.log('schedular to run in one min');
       await agenda.schedule(reminderDate, 'emailForDataRequestReminder',dataRequest);

      },
      async reminderToPSHMS(reminderDate,dataRequest) {
        await agenda.start();
        console.log('schedular to run in one min');
       await agenda.schedule(reminderDate, 'emailForReminderToPSHMS',dataRequest);

      },
      async reminderToHead(reminderDate,dataRequest){
        await agenda.start();
        console.log('schedular to run in one min');
       await agenda.schedule(reminderDate, 'emailForReminderToHead',dataRequest);
      },
      async reminderUniversityUsers(data) {
        await agenda.start();
        await agenda.schedule('0 0 15 12 *', 'sendAnnualReportReminder');
        await agenda.schedule('0 0 15 3,6,9,12 *', 'sendQuarterlyReportReminder');

      },
      async notificationToSeniorStatistician(){
        console.log("In notification to ss")
        let date=new Date()
        await agenda.start();
         await agenda.schedule(new Date(date.getFullYear(),date.getMonth()+1,1),'sendNotificationToSS')
      },
}
// 0 0 15 12 *// year
//  0 0 15 3,6,9,12 *// quarter
