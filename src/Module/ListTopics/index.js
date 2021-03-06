import React from 'react';
import { useParams } from 'react-router-dom';
import { Empty, List } from 'antd';
import TimeAgo from 'react-timeago';
import Filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { Connect } from '../../state/index';

const ListTopics = ({ items }) => {
  const { id } = useParams();
  const listFile = Filter(items, (item) => item.topic === id);

  if (isEmpty(listFile)) {
    return <Empty />;
  }

  return (
    <div>
      <List
        size="large"
        itemLayout="horizontal"
        bordered
        dataSource={listFile}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a
                href={`${process.env.REACT_APP_BASE_URL}/api/v1/resources/view_file/${item.id}`}
                target="_blank"
                rel="noopener noreferrer"
                key="list-loadmore-edit"
              >
                View
              </a>,
              <a
                key="download_file"
                href={`${process.env.REACT_APP_BASE_URL}/api/v1/resources/download_file/${item.id}`}
                rel="noopener noreferrer"
              >
                Download
              </a>,
            ]}
          >
            <List.Item.Meta title={item.name} description={item.description} />

            <TimeAgo title="Available since" date={item.created_at} />
          </List.Item>
        )}
      />
    </div>
  );
};

ListTopics.defaultProps = {
  items: [],
};

ListTopics.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.string })),
};

export default Connect(ListTopics, {
  items: 'resource.data',
});
