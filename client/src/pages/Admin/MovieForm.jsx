import React from "react";
import { Col, Form, message, Modal, Row, Input, Select, Button } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { AddMovie, UpdateMovie } from "../../apicalls/movies";
import moment from "moment";

const { Option } = Select;

function MovieForm({
  showMovieFormModal,
  setShowMovieFormModal,
  selectedMovie,
  setSelectedMovie,
  getData,
  formType,
}) {
  if (selectedMovie) {
    selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format(
      "YYYY-MM-DD"
    );
  }

  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;

      if (formType === "add") {
        response = await AddMovie(values);
      } else {
        response = await UpdateMovie({
          ...values,
          movieId: selectedMovie._id,
        });
      }

      if (response.success) {
        getData();
        message.success(response.message);
        setShowMovieFormModal(false);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    }
    catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <Modal
      title={formType === "add" ? "ADD MOVIE" : "EDIT MOVIE"}
      open={showMovieFormModal}
      onCancel={() => {
        setShowMovieFormModal(false);
        setSelectedMovie(null);
      }}
      footer={null}
      width={800}
    >
      <Form layout="vertical" initialValues={selectedMovie} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Movie Name" name="title">
              <Input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Movie Description" name="description">
              <Input.TextArea showCount />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Movie Duration (Min)" name="duration">
              <Input type="number" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Language" name="language">
              <Select placeholder="Select Language" >
                <Option value="Telugu">Telugu</Option>
                <Option value="English">English</Option>
                <Option value="Hindi">Hindi</Option>
                <Option value="Tamil">Tamil</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Movie Release Date" name="releaseDate">
              <Input type="date" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Genre" name="genre">
              <Select placeholder="Select Genre" >
                <Option value="Action">Action</Option>
                <Option value="Comedy">Comedy</Option>
                <Option value="Drama">Drama</Option>
                <Option value="Romance">Romance</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item label="Poster URL" name="poster">
              <Input type="url" />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end gap-1">
          <Button
            type="text"
            onClick={() => {
              setShowMovieFormModal(false);
              setSelectedMovie(null);
            }}
          >Cancel</Button>
          <Button htmlType="submit" type="primary" >Submit</Button>
        </div>
      </Form>
    </Modal>
  );
}

export default MovieForm;