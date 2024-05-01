"use client";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { FaHourglassStart } from "react-icons/fa6";

import "react-vertical-timeline-component/style.min.css";

const Timeline = () => {
  return (
    <VerticalTimeline lineColor="#444">
      <VerticalTimelineElement
        visible
        className="vertical-timeline-element--education"
        contentStyle={{
          background: "rgb(233, 30, 99)",
          color: "#fff",
          boxShadow: "0 0 4px #333",
        }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(233, 30, 99)" }}
        date="2011 - present"
        iconStyle={{
          background: "rgb(233, 30, 99)",
          color: "#fff",
          boxShadow: "0 0 4px #333",
        }}
        icon={<FaHourglassStart />}
      >
        <h3 className="vertical-timeline-element-title">Creative Director</h3>
        <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
        <p>
          Creative Direction, User Experience, Visual Design, Project
          Management, Team Leading
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        visible
        className="vertical-timeline-element--education"
        date="2010 - 2011"
        contentStyle={{ boxShadow: "0 0 4px #333" }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(233, 30, 99)" }}
        iconStyle={{
          background: "rgb(233, 30, 99)",
          color: "#fff",
          boxShadow: "0 0 4px #333",
        }}
        icon={<FaHourglassStart />}
      >
        <h3 className="vertical-timeline-element-title">Art Director</h3>
        <h4 className="vertical-timeline-element-subtitle">
          San Francisco, CA
        </h4>
        <p>
          Creative Direction, User Experience, Visual Design, SEO, Online
          Marketing
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        visible
        className="vertical-timeline-element--education"
        date="2008 - 2010"
        contentStyle={{ boxShadow: "0 0 4px #333" }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(233, 30, 99)" }}
        iconStyle={{
          background: "rgb(233, 30, 99)",
          color: "#fff",
          boxShadow: "0 0 4px #333",
        }}
        icon={<FaHourglassStart />}
      >
        <h3 className="vertical-timeline-element-title">Web Designer</h3>
        <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
        <p>User Experience, Visual Design</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        visible
        className="vertical-timeline-element--education"
        date="2006 - 2008"
        contentStyle={{
          background: "rgb(233, 30, 99)",
          color: "#fff",
          boxShadow: "0 0 4px #333",
        }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(233, 30, 99)" }}
        iconStyle={{
          background: "rgb(233, 30, 99)",
          color: "#fff",
          boxShadow: "0 0 4px #333",
        }}
        icon={<FaHourglassStart />}
      >
        <h3 className="vertical-timeline-element-title">Web Designer</h3>
        <h4 className="vertical-timeline-element-subtitle">
          San Francisco, CA
        </h4>
        <p>User Experience, Visual Design</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        visible
        className="vertical-timeline-element--education"
        date="April 2013"
        contentArrowStyle={{ borderRight: "7px solid  rgb(233, 30, 99)" }}
        contentStyle={{ boxShadow: "0 0 4px #333" }}
        iconStyle={{
          background: "rgb(233, 30, 99)",
          color: "#fff",
          boxShadow: "0 0 4px #333",
        }}
        icon={<FaHourglassStart />}
      >
        <h3 className="vertical-timeline-element-title">
          Content Marketing for Web, Mobile and Social Media
        </h3>
        <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
        <p>Strategy, Social Media</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        visible
        className="vertical-timeline-element--education"
        date="November 2012"
        contentStyle={{ boxShadow: "0 0 4px #333" }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(233, 30, 99)" }}
        iconStyle={{
          background: "rgb(233, 30, 99)",
          color: "#fff",
          boxShadow: "0 0 4px #333",
        }}
        icon={<FaHourglassStart />}
      >
        <h3 className="vertical-timeline-element-title">
          Agile Development Scrum Master
        </h3>
        <h4 className="vertical-timeline-element-subtitle">Certification</h4>
        <p>Creative Direction, User Experience, Visual Design</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        visible
        className="vertical-timeline-element--education"
        date="2002 - 2006"
        iconStyle={{
          background: "rgb(233, 30, 99)",
          color: "#fff",
          boxShadow: "0 0 4px #333",
        }}
        icon={<FaHourglassStart />}
        contentStyle={{
          background: "rgb(233, 30, 99)",
          color: "#fff",
          boxShadow: "0 0 4px #333",
        }}
        contentArrowStyle={{ borderRight: "7px solid  rgb(233, 30, 99)" }}
      >
        <h3 className="vertical-timeline-element-title">
          Bachelor of Science in Interactive Digital Media Visual Imaging
        </h3>
        <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
        <p>Creative Direction, Visual Design</p>
      </VerticalTimelineElement>
    </VerticalTimeline>
  );
};

export default Timeline;
