
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const port = 3000; // Đây là cổng bạn cần biết

// Require các router
var indexRouter = require('./routes/index');
var analyticsRouter = require('./routes/analytics.route');
var applicationsRouter = require('./routes/applications.route');
var companiesRouter = require('./routes/companies.route');
var cv_template_categoriesRouter = require('./routes/cv_template_categories.route');
var cv_template_componentsRouter = require('./routes/cv_template_components.route');
var cv_template_industriesRouter = require('./routes/cv_template_industries.route');
var cv_template_ratingsRouter = require('./routes/cv_template_ratings.route');
var cv_template_usage_statsRouter = require('./routes/cv_template_usage_stats.route');
var cv_templatesRouter = require('./routes/cv_templates.route');
var eventsRouter = require('./routes/events.route');
var feedbacksRouter = require('./routes/feedbacks.route');
var interviewsRouter = require('./routes/interviews.route');
var job_categoriesRouter = require('./routes/job_categories.route');
var job_category_mappingRouter = require('./routes/job_category_mapping.route');
var job_skillsRouter = require('./routes/job_skills.route');
var jobsRouter = require('./routes/jobs.route');
var jobseekersRouter = require('./routes/jobseekers.route');
var notificationsRouter = require('./routes/notifications.route');
var payment_servicesRouter = require('./routes/payment_services.route');
var resumesRouter = require('./routes/resumes.route');
var saved_jobsRouter = require('./routes/saved_jobs.route');
var service_categoriesRouter = require('./routes/service_categories.route');
var user_activitiesRouter = require('./routes/user_activities.route');
var user_cv_templatesRouter = require('./routes/user_cv_templates.route');
var user_paymentsRouter = require('./routes/user_payments.route');
var usersRouter = require('./routes/users.route');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// Đăng ký các router
app.use('/', indexRouter);
app.use('/analyticss', analyticsRouter);
app.use('/applicationss', applicationsRouter);
app.use('/companiess', companiesRouter);
app.use('/cv_template_categoriess', cv_template_categoriesRouter);
app.use('/cv_template_componentss', cv_template_componentsRouter);
app.use('/cv_template_industriess', cv_template_industriesRouter);
app.use('/cv_template_ratingss', cv_template_ratingsRouter);
app.use('/cv_template_usage_statss', cv_template_usage_statsRouter);
app.use('/cv_templatess', cv_templatesRouter);
app.use('/eventss', eventsRouter);
app.use('/feedbackss', feedbacksRouter);
app.use('/interviewss', interviewsRouter);
app.use('/job_categoriess', job_categoriesRouter);
app.use('/job_category_mappings', job_category_mappingRouter);
app.use('/job_skillss', job_skillsRouter);
app.use('/jobss', jobsRouter);
app.use('/jobseekerss', jobseekersRouter);
app.use('/notificationss', notificationsRouter);
app.use('/payment_servicess', payment_servicesRouter);
app.use('/resumess', resumesRouter);
app.use('/saved_jobss', saved_jobsRouter);
app.use('/service_categoriess', service_categoriesRouter);
app.use('/user_activitiess', user_activitiesRouter);
app.use('/user_cv_templatess', user_cv_templatesRouter);
app.use('/user_paymentss', user_paymentsRouter);
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
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});

module.exports = app;
