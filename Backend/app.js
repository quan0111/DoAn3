
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var app = express();
app.use(cors());

// Require các router
var indexRouter = require('./routes/index');
var advertisementsRouter = require('./routes/advertisements.route');
var ai_contextsRouter = require('./routes/ai_contexts.route');
var ai_intentsRouter = require('./routes/ai_intents.route');
var ai_queriesRouter = require('./routes/ai_queries.route');
var analyticsRouter = require('./routes/analytics.route');
var applicationsRouter = require('./routes/applications.route');
var article_categoriesRouter = require('./routes/article_categories.route');
var article_category_mappingRouter = require('./routes/article_category_mapping.route');
var articlesRouter = require('./routes/articles.route');
var companiesRouter = require('./routes/companies.route');
var company_followersRouter = require('./routes/company_followers.route');
var eventsRouter = require('./routes/events.route');
var feedbacksRouter = require('./routes/feedbacks.route');
var interviewsRouter = require('./routes/interviews.route');
var job_categoriesRouter = require('./routes/job_categories.route');
var job_category_mappingRouter = require('./routes/job_category_mapping.route');
var job_skillsRouter = require('./routes/job_skills.route');
var jobsRouter = require('./routes/jobs.route');
var jobseekersRouter = require('./routes/jobseekers.route');
var notificationsRouter = require('./routes/notifications.route');
var paymentsRouter = require('./routes/payments.route');
var resumesRouter = require('./routes/resumes.route');
var saved_jobsRouter = require('./routes/saved_jobs.route');
var translationsRouter = require('./routes/translations.route');
var user_activitiesRouter = require('./routes/user_activities.route');
var usersRouter = require('./routes/users.route');



// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Đăng ký các router
app.use('/', indexRouter);
app.use('/advertisementss', advertisementsRouter);
app.use('/ai_contextss', ai_contextsRouter);
app.use('/ai_intentss', ai_intentsRouter);
app.use('/ai_queriess', ai_queriesRouter);
app.use('/analyticss', analyticsRouter);
app.use('/applicationss', applicationsRouter);
app.use('/article_categoriess', article_categoriesRouter);
app.use('/article_category_mappings', article_category_mappingRouter);
app.use('/articless', articlesRouter);
app.use('/companiess', companiesRouter);
app.use('/company_followerss', company_followersRouter);
app.use('/eventss', eventsRouter);
app.use('/feedbackss', feedbacksRouter);
app.use('/interviewss', interviewsRouter);
app.use('/job_categoriess', job_categoriesRouter);
app.use('/job_category_mappings', job_category_mappingRouter);
app.use('/job_skillss', job_skillsRouter);
app.use('/jobss', jobsRouter);
app.use('/jobseekerss', jobseekersRouter);
app.use('/notificationss', notificationsRouter);
app.use('/paymentss', paymentsRouter);
app.use('/resumess', resumesRouter);
app.use('/saved_jobss', saved_jobsRouter);
app.use('/translationss', translationsRouter);
app.use('/user_activitiess', user_activitiesRouter);
app.use('/userss', usersRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});

module.exports = app;
