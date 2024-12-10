import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import LocationList from "./LocationList";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "../redux/apiCall";

function Location() {
  const navigate = useNavigate();
  const dispatch=useDispatch();


const locations =  useSelector((state) => state.location.locations);
console.log(locations)

useEffect(() => {
  dispatch(fetchLocations()); // في حالة تحميل موقعات
},[]);
const handleEditClick = (location) => {
    navigate("/EditLocation", { state: { location } });
  };

  const handleDetailClick = (location) => {
    navigate("/DetailsLocation", { state: { location } }); // نقل البيانات إلى صفحة التفاصيل
  };

  const handleDeleteClick = (location) => {
    console.log("Delete location:", location);
   
  };

console.log(locations)
  return (
    <MainLayout>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Liste Locations</h1>
          <Link to="/Nouvellelocation" className="btn btn-primary">
            Nouvelle Location
          </Link>
        </div>
        <LocationList
          locations={locations}
          onEditClick={handleEditClick}
          onDetailClick={handleDetailClick}
          onDeleteClick={handleDeleteClick}
        />
      </div>
    </MainLayout>
  );
}

export default Location;
