'use client'
import React, { useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import Card, { CardContent } from "../components/ui/Card";
import Button from "../components/ui/Button";
import ProgressBar from "../components/ui/ProgressBar";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogFooter,
} from "../components/ui/Dialog";
import ChartAnnotation from 'chartjs-plugin-annotation';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, ChartAnnotation);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("skill-test");
  const [showPopup, setShowPopup] = useState(false);
  const [formValues, setFormValues] = useState({ rank: "-", percentile: "-", correct: "-" });
  const [percentile, setPercentile] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowPopup(false);
  
    console.log("Form elements:", e.target.elements);
  
    const rank = e.target["rank"]?.value;
    const percentile = e.target["percentile"]?.value;
    const correct = e.target["correct"]?.value;

  
    console.log("Rank:", rank?.value);
    console.log("Percentile (raw):", percentile?.value);
    console.log("Correct:", correct?.value);
  
    setFormValues({
      rank: rank || "-",
      percentile: percentile || "-",
      correct: correct || "-",
    });
    
  
    const percentileNumber = Number(percentile?.value);
    console.log("Converted Percentile:", percentileNumber); // Check if NaN
  
    setPercentile(percentileNumber);
  };
  

  const graphData = {
    labels: Array.from({ length: 9 }, (_, i) => i * 12.5),
    datasets: [
      {
        data: [0, 12, 30, 28, 60, 55, 50, 30, 10],
        borderColor: "#4B5563",
        backgroundColor: "rgba(75, 85, 99, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };
  
  const graphOptions = {
    responsive: true,
    scales: {
      y: {
        display: false,
      },
      x: {
        title: {
          display: true,
          text: "Percentile (%)",
          font: { size: 14 }
        },
        ticks: {
          autoSkip: false,
        },
      },
    },
    plugins: {
      title: {
      display: true,
      text: "Your Performance Compared to Other Engineers",
      font: {
        size: 16
      }
    },
    legend: {
      display: false
    },
      tooltip: {
        enabled: true,
      },
    },
    annotation: {
      annotations: percentile
        ? [
            {
              type: "line",
              mode: "vertical",
              scaleID: "x",
              value: percentile,
              borderColor: "blue",
              borderWidth: 1,
              label: {
                content: "Your Percentile",
                enabled: true,
                position: "top",
              },
            },
          ]
        : [],
    },
  };  

  return (
    <div className="flex min-h-screen bg-white text-black">
      <header className="flex items-center justify-between px-6 py-4 border-b w-full fixed top-0 left-0 z-10 bg-white shadow-md">
        <div className="flex items-center">
          <img src='/assets/logo.png' alt="Logo" className="w-8 h-8 mr-3" />
          <div className="font-bold text-2xl">WhatBytes</div>
        </div>
        <div className="flex items-center space-x-2 border border-opacity-25 rounded-md p-1">
          <img src='/assets/Prath.jpg' alt="Profile" className="w-8 h-8 rounded-full" />
          <span className="font-bold">Prathmesh Borate</span>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <img src="/assets/hamburger.png" alt="Menu" className="w-6 h-6" />
          </button>
        </div>
      </header>
      <nav className={`w-full md:w-1/5 bg-white h-full p-4 mt-16 border-r ${isMenuOpen ? '' : 'hidden md:block'}`}>
        <ul className="space-y-3">
          {[
            { name: "Dashboard", id: "dashboard", iconBase: "graph" },
            { name: "Skill Test", id: "skill-test", iconBase: "badge" },
            { name: "Internship", id: "internship", iconBase: "document" },
          ].map((tab) => (
            <li
              key={tab.id}
              className={`flex items-center space-x-3 p-4 rounded-full font-bold text-lg cursor-pointer transition ${
                activeTab === tab.id ? "bg-gray-100 text-blue-500" : "hover:bg-gray-100 text-slate-600"
              }`}
              onClick={() => {
                setActiveTab(tab.id);
                setIsMenuOpen(false);
              }}
            >
              <img
                src={`/assets/nav/${tab.iconBase}-${activeTab === tab.id ? "blue" : "black"}.png`}
                alt={tab.name}
                className="w-5 h-5"
              />
              <span>{tab.name}</span>
            </li>
          ))}
        </ul>
      </nav>
      <div className="w-full md:w-4/5 pt-24">
        <p className="text-2xl font-bold text-slate-700 ml-8">Skill Test</p>
        <main className="p-6">
          {activeTab === "skill-test" && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-3 space-y-4">
                <Card>
                  <CardContent className="flex justify-between">
                    <div className="flex items-center">
                      <img src='/assets/html.png' alt="HTML Logo" className="w-10 h-10 mr-2" />
                      <div className="mr-2">
                        <p className="font-bold">Hyper Text Markup Language</p>
                        <p className="text-gray-500">Question: 0 | Duration: 15 mins | Submitted on 5 June 2021</p>
                      </div>
                      <Button onClick={() => setShowPopup(true)}>Update</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <p className="font-bold mb-4">Quick Statistics</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <img src="/assets/trophy.png" alt="Trophy" className="w-6 h-6" />
                        </div>
                        <div className="ml-3 text-left">
                          <p className="font-bold">{formValues.rank}</p>
                          <p className="text-gray-500">Your Rank</p>
                        </div>
                      </div>
                      <div className="h-16 w-px bg-gray-300"></div>
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <img src="/assets/notepad.png" alt="Notepad" className="w-6 h-6" />
                        </div>
                        <div className="ml-3 text-left">
                          <p className="font-bold">{formValues.percentile}</p>
                          <p className="text-gray-500">Percentile</p>
                        </div>
                      </div>
                      <div className="h-16 w-px bg-gray-300"></div>
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <img src="/assets/correct.png" alt="Correct" className="w-8 h-8" />
                        </div>
                        <div className="ml-3 text-left">
                          <p className="font-bold">{formValues.correct} / 15</p>
                          <p className="text-gray-500">Correct Answers</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <div className="ml-3 text-left flex-1">
                        <p className="font-bold text-lg">Comparison Graph</p>
                        <p className="text-sm text-slate-600">
                          <span className="font-bold">You scored {formValues.percentile}% percentile</span> which is lower than the average percentile 72% of all the engineers who took this assessment.
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <img src="/assets/chart.png" alt="Chart" className="w-6 h-6" />
                      </div>
                    </div>
                    <Line data={graphData} options={graphOptions} />
                  </CardContent>
                </Card>
              </div>
              <div className="md:col-span-2 space-y-4">
                <Card>
                  <CardContent>
                    <p className="font-bold mb-8">Syllabus Wise Analysis</p>
                    {[
                      { name: "HTMLTools, Forms, History", value: 80, bgColor: "bg-blue-500", textColor: "text-blue-500" },
                      { name: "Tags & References in HTML", value: 75, bgColor: "bg-orange-500", textColor: "text-orange-500" },
                      { name: "Tables and References in HTML", value: 60, bgColor: "bg-red-500", textColor: "text-red-500" },
                      { name: "Tables and CSS Basics", value: 50, bgColor: "bg-green-500", textColor: "text-green-500" },
                    ].map((item) => (
                      <div key={item.name}>
                        <p className="text-left text-slate-600 text-sm mb-2">{item.name}</p>
                        <div className="flex items-center mb-6">
                          <div className="flex-1 mr-2">
                            <ProgressBar value={item.value} colorClass={item.bgColor} />
                          </div>
                          <span className={`ml-2 font-bold text-sm ${item.textColor}`}>{item.value}%</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <p className="font-bold">Question Analysis</p>
                      <p className="text-base font-bold text-blue-500">{formValues.correct}/15</p>
                    </div>
                    
                    <p className="text-sm text-slate-600">
                      <span className="font-bold">You scored {formValues.correct} questions out of 15.</span> However it still needs some improvements
                    </p>
                    
                    <div className="flex justify-center items-center mt-4">
                      <div className="relative w-[150px] h-[150px]">
                        <Pie
                          data={{
                            datasets: [
                              {
                                data: [formValues.correct || 0, 15 - (formValues.correct || 0)],
                                backgroundColor: ["#3B82F6", "#D1D5DB"],
                              },
                            ],
                          }}
                        />
                        <div className="absolute inset-0 bg-white rounded-full mx-auto my-auto w-20 h-20"></div>
                        <img
                          src="/assets/dart.png"
                          alt="Badge"
                          className="absolute inset-0 w-16 h-16 mx-auto my-auto"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
      <Dialog isOpen={showPopup} onClose={() => setShowPopup(false)} width="w-[650px]">
        <DialogHeader className="flex justify-between items-center">
          <span className="text-lg font-semibold">Update Details</span>
          <img src="/assets/html.png" alt="HTML Logo" className="w-10 h-10 ml-4" />
        </DialogHeader>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <DialogContent>
            {[
              { name: "rank", label: "Rank", warning: "Required | Should be a number", icon: "/assets/one.png" },
              { name: "percentile", label: "Percentile", warning: "Required | 0-100", icon: "/assets/two.png" },
              { name: "correct", label: "Correct Questions (Out of 15)", warning: "Required", icon: "/assets/three.png" },
            ].map(({ name, label, warning, icon }) => (
              <div key={name} className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-3">
                  <img src={icon} alt={`${label} Icon`} className="w-8 h-8" />
                  <p className="text-black whitespace-nowrap">
                    Update your <span className="font-bold">{label}</span>
                  </p>
                </div>
                <div className="flex flex-col w-45 ml-auto">
                  <input
                    type="number"
                    name={name}
                    className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onBlur={(e) => {
                      if (!e.target.value || (name === "rank" && isNaN(e.target.value)) || (name === "percentile" && (e.target.value < 0 || e.target.value > 100))) {
                        e.target.classList.add("border-red-500");
                        document.getElementById(`${name}-warning`).classList.remove("hidden");
                      } else {
                        e.target.classList.remove("border-red-500");
                        document.getElementById(`${name}-warning`).classList.add("hidden");
                      }
                    }}
                  />
                  <p id={`${name}-warning`} className="text-red-500 text-xs hidden">
                    {warning}
                  </p>
                </div>
              </div>
            ))}
          </DialogContent>
          <DialogFooter className="flex justify-end space-x-4">
            <Button className="px-4 py-2 border border-blue-500 text-blue-500 bg-white rounded hover:bg-blue-100 transition" onClick={() => setShowPopup(false)}>
              Cancel
            </Button>
            <Button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
};

export default Dashboard;
