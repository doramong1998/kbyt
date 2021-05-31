import type { FC } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { List } from './components';

type Props = {
};

const ClassManage: FC<Props> = () => {
  return (
    <GridContent>
      <div className="layout--main">
        <div className="layout--main__content">
          <List />
        </div>
      </div>
    </GridContent>
  );
};

export default ClassManage;
