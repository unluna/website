import { PageContainer } from '@ant-design/pro-components';
import { request } from '@umijs/max';
import { Button, Input } from 'antd';
import { useCallback, useState } from 'react';
import styles from './index.less';

const HomePage: React.FC = () => {
  // const [username, setUsername] = useState<string>();
  const [questionText, setQuestionText] = useState<string>();
  const [answerList, setAnswerList] = useState<string[]>([]);

  const ajaxAskDeepSeek = useCallback(() => {
    request('https://website-worker.729769298.workers.dev/graphql', {
      // request('http://localhost:8787/', {
      method: 'POST',
      data: {
        query: `
        query($prompt: String!) {
          ask(prompt: $prompt) {
            errno
            result
            error
          }
        }
      `,
        variables: {
          prompt: questionText,
        },
      },
    }).then((res) => {
      setAnswerList([...answerList, res?.data?.ask?.result]);
    });
  }, [questionText, answerList, setAnswerList]);

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <div style={{ maxWidth: '800px' }}>
          {/*<div>*/}
          {/*  请输入用户：*/}
          {/*  <Input*/}
          {/*    value={username}*/}
          {/*    onChange={(e) => setUsername(e.target.value)}*/}
          {/*  />*/}
          {/*</div>*/}
          <div>
            请输入问题：
            <Input
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </div>
          <Button onClick={() => ajaxAskDeepSeek()}>发送</Button>
        </div>
        {answerList.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </PageContainer>
  );
};

export default HomePage;
