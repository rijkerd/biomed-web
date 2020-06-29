import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Divider, List, Avatar } from 'antd';
import { Connect } from '../../state/index';

import './styles.css';

const { Content } = Layout;

const ListAll = ({ items }) => {
  return (
    <Content className="ListAll">
      <Divider orientation="center">Available Modules</Divider>
      <List
        size="large"
        dataSource={items}
        bordered
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar>{item.category}</Avatar>}
              title={`${item.name}`}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </Content>
  );
};

ListAll.defaultProps = {
  items: [],
};

ListAll.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.string })),
};

export default Connect(ListAll, {
  items: 'module.data',
});
