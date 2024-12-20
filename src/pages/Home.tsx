import type { FC } from 'hono/jsx';

import Navbar from '../components/Navbar';
import Layout from '../layouts';

const Home: FC = () => {
  return (
    <Layout>
      <div>
        <Navbar />
      </div>
    </Layout>
  );
};

export default Home;
