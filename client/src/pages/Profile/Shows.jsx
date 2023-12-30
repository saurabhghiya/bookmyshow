import { Col, Form, Modal, Row, Table, message, Input, Select, Button } from "antd"
import React , {useEffect, useState} from 'react'
// import Button from '../../components/Button'
import {GetAllMovies} from "../../apicalls/movies"
import {AddShow, GetAllShowsByTheatre, DeleteShows} from '../../apicalls/shows'
import moment from "moment"
import { useDispatch } from "react-redux"
import { HideLoading, ShowLoading } from "../../redux/loadersSlice"

const { Option } = Select;

function Shows({ openShowsModal, setOpenShowsModal, theatre }) {

    let [view, setView] = useState("table");
    let [movies,setMovies] = useState([]);
    let [shows,setShows] = useState([]);

    const dispatch = useDispatch();

    const getData = async ()=>{
        try{
            dispatch(ShowLoading());
            const moviesResponse = await GetAllMovies();
            if(moviesResponse.success){
                setMovies(moviesResponse.data);
            }else{
                message.error(moviesResponse.message)
            }
            const showsResponse = await GetAllShowsByTheatre({theatreId:theatre._id});
            if(showsResponse.success){
                setShows(showsResponse.data)
            }else{
                message.error(showsResponse.message);
            }
            dispatch(HideLoading());
        }catch(error){
            message.error(error.message)
            dispatch(HideLoading());
        }
    }

    const handleAddShow = async (values)=>{
        try{
            dispatch(ShowLoading());
            const response = await AddShow({
                ...values,
                theatre:theatre._id
            })
            if(response.success){
                message.success(response.message)
                getData();
                setView('table')
            }else{
                message.error(response.message);
            }
            dispatch(HideLoading());
        }catch(error){
            message.error(error.message)
            dispatch(HideLoading());
        }
    }

    const handleDelete = async (showId)=>{
        try{
            dispatch(ShowLoading());
            const response = await DeleteShows({showId:showId})
            if(response.success){
                message.success(response.message);
                getData();
            }else{
                message.error(response.message);
            }
            dispatch(HideLoading());
        }catch(err){
            message.err(err.message);
            dispatch(HideLoading())
        }
    }

    const columns = [
        {
          title: "Show Name",
          dataIndex: "name",
        },
        {
          title: "Date",
          dataIndex: "date",
          render: (text, record) => {
            return moment(text).format("MMM Do YYYY");
          },
        },
        {
          title: "Time",
          dataIndex: "time",
        },
        {
          title: "Movie",
          dataIndex: "movie",
          render: (text, record) => {
            return record.movie.title;
          },
        },
        {
          title: "Ticket Price",
          dataIndex: "ticketPrice",
        },
        {
          title: "Total Seats",
          dataIndex: "totalSeats",
        },
        {
          title: "Available Seats",
          dataIndex: "availableSeats",
          render: (text, record) => {
            return record.totalSeats - record.bookedSeats.length;
          },
        },
        {
          title: "Action",
          dataIndex: "action",
          render: (text, record) => {
            return (
              <div className="flex gap-1 items-center">
                {record.bookedSeats.length === 0 && (
                  <i
                    className="ri-delete-bin-line"
                    onClick={() => {
                      handleDelete(record._id);
                    }}
                  ></i>
                )}
              </div>
            );
          },
        },
      ];

      useEffect(()=>{
          getData()
      },[])

    return (
        <Modal title=""
            open={openShowsModal}
            onCancel={() => setOpenShowsModal(false)}
            width={1400}
            footer={null}>
            <h1 className="text-primary text-md uppercase mb-1">
                Theatre : {theatre.name}
            </h1>

            <hr/>

    <div className="flex justify-between mt-1 mb-1 items-center">
        <h1 className="text-md uppercase">
          {view === "table" ? "Shows" : "Add Show"}
        </h1>
        {(
          <Button
            type="primary"
            onClick={() => {
              setView("form");
            }}
          >Add Show</Button>
        )}
      </div>


      {view==='table' && <Table columns={columns} dataSource={shows}/>}


      {view === "form" && (
        <Form layout="vertical" onFinish={handleAddShow}>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                label="Show Name"
                name="name"
                rules={[{ required: true, message: "Please input show name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please input show date!" }]}
              >
                <Input
                  type="date"
                  min={new Date()}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Time"
                name="time"
                rules={[{ required: true, message: "Please input show time!" }]}
              >
                <Input type="time" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Movie"
                name="movie"
                rules={[{ required: true, message: "Please select movie!" }]}
              >
                <Select placeholder="Please select a movie" >
                  {movies.map((movie) => (
                    <Option value={movie._id}>{movie.title}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Ticket Price"
                name="ticketPrice"
                rules={[
                  { required: true, message: "Please input ticket price!" },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Total Seats"
                name="totalSeats"
                rules={[
                  { required: true, message: "Please input total seats!" },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end gap-1">
            <Button
              className="bg-lightgrey"
              type="text"
              onClick={() => {
                setView("table");
              }}
            >Cancel</Button>
            <Button type="primary" htmlType="submit" > Save </Button>
          </div>
        </Form>
      )}
    </Modal>
    )
}

export default Shows