import React from 'react';
import PropTypes from 'prop-types';
import Map from 'lodash/map';
import { Layout, Divider, Collapse, List } from 'antd';
import { useHistory } from 'react-router-dom';
import { Connect } from '../../state/index';

import './styles.css';

const { Content } = Layout;
const { Panel } = Collapse;

const ListAll = ({ items, match }) => {
  const history = useHistory();

  const viewModule = (event, id) => {
    event.preventDefault();
    return history.push(`${match.url}/${id}`);
  };

  return (
    <Content className="ListAll">
      <Divider orientation="center">Available Modules</Divider>
      <Collapse ghost>
        {Map(items, ({ name, id, topics, code }) => (
          <Panel header={`${name}${'   '}${code}`} key={id}>
            <List
              dataSource={topics}
              bordered
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  onClick={(e) => viewModule(e, item.id)}
                >
                  {item.name}
                </List.Item>
              )}
            />
          </Panel>
        ))}
      </Collapse>
    </Content>
  );
};

ListAll.defaultProps = {
  items: [],
};

ListAll.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.string })),
  match: PropTypes.shape({ url: PropTypes.string, path: PropTypes.string })
    .isRequired,
};

export default Connect(ListAll, {
  items: 'module.data',
});
