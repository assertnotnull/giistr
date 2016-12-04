import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { User } from '../reducers/user';
import { getAllTags } from '../actions/tags';
import NavigationBar from '../components/navigation-bar';
import ToolBar from '../components/toolbar';
import ListMenu from '../components/list-menu';

interface MainProps {
  location?: any;
  user: User;
  filters: Map<string, any>;
  getAllTags: any;
};

const styles = {
  listWrapper: {
    display: 'flex'
  },
  listContent: {
    flex: 1
  }
};

class ListView extends React.Component<MainProps, any> {

  public componentWillMount() {
    this.props.getAllTags();
  }

  public render() {
    const { location, user, filters } = this.props;

    return (
      <div>
        <NavigationBar
          user={user}
          location={location}/>
        <div style={styles.listWrapper}>
          <div style={styles.listContent}>
            <ListMenu/>
          </div>
          <ToolBar
            filters={filters}/>
        </div>
      </div>
    );
  }
}

export default
connect((state, props) => ({
  user: state.get('user'),
  filters: state.get('filters')
}), (dispatch) => ({
  getAllTags: bindActionCreators(getAllTags, dispatch)
}))(ListView);
