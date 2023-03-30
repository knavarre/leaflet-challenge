![alt text](https://raw.githubusercontent.com/knavarre/leaflet-challenge/main/Images/1-Logo.png)
# USGS Earthquake Visualization
By Kiana Navarre

**Programming Language Used: JavaScript, HTML, CSS**

## Description
The goal of this project is to create an interactive map using earthquake data from the United States Geological Survey (USGS).  For this project, earthquake dataa from the past 7 days is pulled. 

## Method
The following steps are followed to create the desired visualization: 
1. Pull data for all earquakes within the past 7 days from [earthquakes.usgs.gov](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).  This data is presented in a JSON format. 
2. Using Leaflet, create a map that plots the earthquakes based on longitude and latitude. 
   - The size of the marker reflects the earthquake magnitude. Higher magnitude earthquaks appear larger in size. 
   - The color of the marker reflects the earthquake depth. This is denoted using a color range from red to blue. Earthquakes with a greater depth being denoted in red and earthquakes with a smaller depth being denoted in blue. 
   - Include popup information for each earquake.  When the marker is clicked display the following information: 
     - Earthquake location
     - Magnitude
     - Depth
3. Create a legend

## Resulting Visualization
The resulting visualization resembles: 
![alt text](https://raw.githubusercontent.com/knavarre/leaflet-challenge/main/Images/Map_Visualization.PNG)
(Data points are subject to change as earthquake data on USGS website is updated.)