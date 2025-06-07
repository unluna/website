import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { request } from '@umijs/max';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';

const HomePage: React.FC = () => {
  // const { name } = useModel('global');
  const [questionText, setQuestionText] = useState<string>();
  useEffect(() => {
    // request('/api', {
    request('https://website-worker.729769298.workers.dev/', {
      method: 'GET',
    }).then((res) => {
      console.log('res', res);
    });
  }, []);

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <div>
          请输入问题：
          <Input
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </div>

        <Guide name={trim('白世玉的网站')} />
      </div>
    </PageContainer>
  );
};

export default HomePage;
