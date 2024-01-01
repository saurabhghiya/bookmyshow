import { Tabs } from 'antd';
import PageTitle from '../../components/PageTitle';
import TheatresList from './TheatresList';
import Bookings from './Bookings';


export default function Profile(){
    
    return (<>
        <PageTitle title="Profile" />

        <Tabs 
            type="card" 
            defaultActiveKey='1'
            items={
                [
                    {
                        key: 1,
                        label: "Bookings",
                        children: <Bookings />
                    },
                    {
                        key: 2,
                        label: "Theatres",
                        children: <TheatresList />
                    }
                ]
            }
        />
    </>
    )
}