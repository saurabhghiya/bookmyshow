import { Tabs } from 'antd';
import PageTitle from '../../components/PageTitle';
import MoviesList from './MoviesList';
import TheatreTable from './TheatresTable';

export default function Admin(){
    
    return (<>
        <PageTitle title="Admin" />
        <Tabs type="card" defaultActiveKey='1'>

            <Tabs.TabPane tab="Movies" key="1">
                <MoviesList/>
            </Tabs.TabPane>
            
            <Tabs.TabPane tab="Theatres" key="2">
                <TheatreTable />
            </Tabs.TabPane>
        </Tabs>
    </>
    )
}