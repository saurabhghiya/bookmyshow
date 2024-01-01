import { Tabs } from 'antd';
import PageTitle from '../../components/PageTitle';
import MoviesList from './MoviesList';
import TheatreTable from './TheatresTable';

export default function Admin(){
    
    return (<>
        <PageTitle title="Admin" />
        <Tabs 
            type="card" 
            defaultActiveKey='1'
            items={
                [
                    {
                        key: 1,
                        label: "Movies",
                        children: <MoviesList/>
                    },
                    {
                        key: 2,
                        label: "Theatres",
                        children: <TheatreTable/>
                    }
                ]
            }
        />
    </>
    )
}