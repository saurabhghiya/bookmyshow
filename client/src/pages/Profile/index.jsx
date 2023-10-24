import { Tabs } from 'antd';
import PageTitle from '../../components/PageTitle';
import TheatresList from './TheatresList';
import Bookings from './Bookings';


export default function Profile(){
    
    return (<>
        <PageTitle title="Profile" />

        <Tabs type="card" defaultActiveKey='1'>
            <Tabs.TabPane tab="Bookings" key="1">
                <Bookings />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Apply for Theatre" key="2">
                <TheatresList />
            </Tabs.TabPane>
        </Tabs>
    </>
    )
}