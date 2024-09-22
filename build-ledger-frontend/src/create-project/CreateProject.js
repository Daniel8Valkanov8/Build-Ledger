import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios'; // Импорт на axios
import './CreateProject.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    eik: '',
    address: '', // добавено за адрес
    parcelArea: '',
    startDate: new Date(),
    endDate: new Date(),
    buildingCount: '', // преименувано от apartments на buildingCount
    buildingStatus: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date, name) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const createBuilding = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.eik) newErrors.eik = 'Eik is required';
    if (!formData.address) newErrors.address = 'Address is required'; // ново поле за адрес
    if (!formData.parcelArea) newErrors.parcelArea = 'Parcel area is required';
    if (!formData.startDate) newErrors.startDate = 'Start Date is required';
    if (!formData.endDate) newErrors.endDate = 'End Date is required';
    if (!formData.buildingCount) newErrors.buildingCount = 'Building Count is required';
    if (!formData.buildingStatus) newErrors.buildingStatus = 'Building Status is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        // Преобразуваме датите във формат LocalDate, защото бекенда очаква `LocalDate`
        const startDateFormatted = formData.startDate.toISOString().split('T')[0];
        const endDateFormatted = formData.endDate.toISOString().split('T')[0];

        // Изпращаме POST заявка към бекенда
        const response = await axios.post('http://localhost:8080/projects/create', {
            title: formData.title,
            eik: formData.eik,
            address: formData.address,
            parcelArea: parseFloat(formData.parcelArea),
            startDate: startDateFormatted,
            endDate: endDateFormatted,
            buildingCount: parseInt(formData.buildingCount),
            buildingStatus: formData.buildingStatus,
          });
          

        console.log('Building created successfully:', response.data);
        setSuccess('Project created successfully!');
        setErrors({}); // Изчистваме грешките

        // Зануляваме формата при успех
        setFormData({
          title: '',
          eik: '',
          address: '', // изчистваме адреса
          parcelArea: '',
          startDate: new Date(),
          endDate: new Date(),
          buildingCount: '',
          buildingStatus: '',
        });
      } catch (error) {
        console.error('Error creating building:', error);
        setSuccess(null);
      }
    }
  };

  return (
    <div className="container-center">
      <div className="card">
        <div className="card-body">
          <h1>Start New Project</h1>
          <form onSubmit={createBuilding}>
            {success && <div className="alert alert-success">{success}</div>}
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                id="title"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
              />
              {errors.title && <small className="text-danger">{errors.title}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="eik">Eik</label>
              <input
                type="text"
                className={`form-control ${errors.eik ? 'is-invalid' : ''}`}
                id="eik"
                name="eik"
                placeholder="Eik"
                value={formData.eik}
                onChange={handleInputChange}
              />
              {errors.eik && <small className="text-danger">{errors.eik}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                id="address"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
              />
              {errors.address && <small className="text-danger">{errors.address}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="parcelArea">Parcel Area (m²)</label>
              <input
                type="text"
                className={`form-control ${errors.parcelArea ? 'is-invalid' : ''}`}
                id="parcelArea"
                name="parcelArea"
                placeholder="Parcel area in m²"
                value={formData.parcelArea}
                onChange={handleInputChange}
              />
              
            </div>

            <div className="date-group">
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <DatePicker
                  selected={formData.startDate}
                  onChange={(date) => handleDateChange(date, 'startDate')}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <DatePicker
                  selected={formData.endDate}
                  onChange={(date) => handleDateChange(date, 'endDate')}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="buildingCount">Building Count</label>
              <input
                type="number"
                className={`form-control ${errors.buildingCount ? 'is-invalid' : ''}`}
                id="buildingCount"
                name="buildingCount"
                placeholder="Building Count"
                value={formData.buildingCount}
                onChange={handleInputChange}
                min="1"
              />
              {errors.buildingCount && <small className="text-danger">{errors.buildingCount}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="buildingStatus">Building Status</label>
              <select
                id="buildingStatus"
                name="buildingStatus"
                className={`form-control ${errors.buildingStatus ? 'is-invalid' : ''}`}
                value={formData.buildingStatus}
                onChange={handleInputChange}
              >
                <option value="">Select Status</option>
                <option value="Cooperation">Cooperation</option>
                <option value="House">House</option>
              </select>
              {errors.buildingStatus && <small className="text-danger">{errors.buildingStatus}</small>}
            </div>

            <button type="submit" className="btn btn-outline-primary mt-3">
              Create Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
