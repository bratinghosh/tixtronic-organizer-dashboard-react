/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/* eslint-disable */

import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import PieChart from "examples/Charts/PieChart";

import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";



function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [analytics, setAnalytics] = useState(undefined);

  useEffect(() => {
    fetchDataHelper("http://localhost:3001/analytics", setAnalytics);
  }, []);

  const fetchDataHelper = async (url, setDataFunction) => {
    axios
      .get(url)
      .then(async (response) => {
        const json = response.data.data;
        console.log(json);
        setDataFunction({...json, "timestamp": ""});
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const chartHelper = (title, labels, data) => {
    return {
      labels: labels,
      datasets: { label: title, data: data },
    }
  };

  return (
    <>
      {loading ? <div>Loading...</div> : 
      <DashboardLayout>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="confirmation_number_icon"
                title="Total Tickets Minted"
                count={analytics.totalticketsminted.data.totalticketsminted}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Primary Market",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="today"
                title={"Tickets Minted Today (" + analytics.totalticketsmintedtoday.data.weekday + ")"}
                count={analytics.totalticketsmintedtoday.data.totalticketsmintedtoday}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Primary Market",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <PieChart
                color="secondary"
                title="Tickets On-Sale"
                description="Secondary Market"
                chart={
                  chartHelper("Tickets On-Sale", 
                              analytics.ticketsonsale.data.labels,
                              analytics.ticketsonsale.data.ticketsonsale)
                }
              />
            </MDBox>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid> */}
          {/* <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="storefront"
                title="Tickets On-Sale"
                count={analytics.ticketsonsale.data.ticketsonsale}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Secondary Market",
                }}
              />
            </MDBox>
          </Grid> */}
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="dark"
                  title="Tickets Minted"
                  description="by weekday"
                  date="Primary Market"
                  chart={
                    chartHelper("Tickets Minted", 
                                analytics.totalticketsmintedbyweekdays.data.weekdays,
                                analytics.totalticketsmintedbyweekdays.data.totalticketsmintedbyweekdays)
                  }
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="info"
                  title="Tickets Minted"
                  description="by day"
                  date="Primary Market"
                  chart={
                    chartHelper("Tickets Minted", 
                                analytics.totalticketsmintedbyday.data.days,
                                analytics.totalticketsmintedbyday.data.totalticketsmintedbyday)
                  }
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Cumulative Tickets Minted"
                  description="by day"
                  date="Primary Market"
                  chart={
                    chartHelper("Tickets Minted", 
                                analytics.cumulativeticketsmintedbyday.data.days,
                                analytics.cumulativeticketsmintedbyday.data.cumulativeticketsmintedbyday)
                  }
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="primary"
                  title="Tickets Owned"
                  description="per user"
                  date="General"
                  chart={
                    chartHelper("Tickets Minted", 
                                analytics.ticketsperuserfrequency.data.ticketscount,
                                analytics.ticketsperuserfrequency.data.frequency)
                  }
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
    }</>
  );
}

export default Dashboard;
