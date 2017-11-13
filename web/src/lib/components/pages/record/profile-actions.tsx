import * as React from 'react';
import { Link } from 'react-router-dom';
import ProfileForm from '../../profile-form/profile-form';
import User from '../../../user';
import messages from '../../../../messages';
import Alert from '../../alert/alert';

interface WhyProfileState {
  expanded: boolean;
}

class WhyProfile extends React.Component<{}, WhyProfileState> {
  state = { expanded: false };

  private toggle = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { expanded } = this.state;
    return (
      <div>
        <div id="why-profile-title">
          {expanded ? (
            messages.WHY_PROFILE.TITLE
          ) : (
            <a onClick={this.toggle}>{messages.WHY_PROFILE.TITLE}</a>
          )}
        </div>
        {expanded && (
          <div id="why-profile">
            <p id="why-profile-text">{messages.WHY_PROFILE.CONTENT}</p>
            <a onClick={this.toggle}>Close</a>
          </div>
        )}
      </div>
    );
  }
}

interface Props {
  user: User;
}

interface State {
  profileFormVisible: boolean;
  alertVisible: boolean;
}

export default class ProfileActions extends React.Component<Props, State> {
  state: State = {
    profileFormVisible: false,
    alertVisible: false,
  };

  private toggleProfileForm = () => {
    this.setState({
      profileFormVisible: !this.state.profileFormVisible,
      alertVisible: this.props.user.hasEnteredInfo(),
    });
  };

  private closeAlert = () => {
    this.setState({
      alertVisible: false,
    });
  };

  render() {
    const { profileFormVisible, alertVisible } = this.state;
    return (
      <div id="profile-actions">
        {!profileFormVisible && <hr />}
        {alertVisible && (
          <Alert autoHide onClose={this.closeAlert}>
            Success, profile created!
          </Alert>
        )}
        {this.props.user.hasEnteredInfo() ? (
          <Link to="/profile">Edit Profile</Link>
        ) : (
          <div>
            {profileFormVisible ? (
              <div id="profile-form-container">
                <ProfileForm
                  user={this.props.user}
                  onExit={this.toggleProfileForm}
                />
              </div>
            ) : (
              <button
                type="button"
                id="create-profile-button"
                onClick={this.toggleProfileForm}>
                Create a profile
              </button>
            )}
            <WhyProfile />
          </div>
        )}
      </div>
    );
  }
}
