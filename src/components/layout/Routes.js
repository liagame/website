import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import TournamentPage from '../pages/TournamentPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import GamesPage from '../pages/GamesPage';
import EditorPage from '../pages/EditorPage';
import EditorTracking from '../pages/EditorTracking';
import AboutPage from '../pages/AboutPage';
import EmailVerificationPage from '../pages/EmailVerificationPage';
import ProfilePage from '../pages/ProfilePage';
import RegistrationEmailPage from '../pages/RegistrationEmailPage';
import TermsAndConditions from "../views/TermsAndConditions";
import PrivacyPolicy from "../views/PrivacyPolicy";
import SettingsPage from "../pages/SettingsPage";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/tournament" component={TournamentPage} />
      <Route path="/leaderboard" component={LeaderboardPage} />
      <Route path="/games" component={GamesPage} />
      <Route path="/editor/tracking" component={EditorTracking} />
      <Route path="/editor" component={EditorPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/account/verify" component={EmailVerificationPage} />
      <Route path="/user/:username" component={ProfilePage} />
      <Route path="/registration" component={RegistrationEmailPage} />
      <Route path="/terms-and-conditions" component={TermsAndConditions} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/settings" component={SettingsPage} />
    </Switch>
  );
}

export default Routes;
