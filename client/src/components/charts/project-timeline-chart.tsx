import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';

interface ProjectData {
  name: string;
  startDate: Date;
  endDate: Date;
  category: string;
  progress: number;
}

const projectData: ProjectData[] = [
  {
    name: "ECサイト構築",
    startDate: new Date(2025, 1, 1),
    endDate: new Date(2025, 3, 15),
    category: "受託開発",
    progress: 100
  },
  {
    name: "SaaS管理システム",
    startDate: new Date(2025, 2, 15),
    endDate: new Date(2025, 5, 30),
    category: "自社サービス",
    progress: 85
  },
  {
    name: "DX導入支援",
    startDate: new Date(2025, 3, 10),
    endDate: new Date(2025, 6, 25),
    category: "コンサル",
    progress: 70
  },
  {
    name: "モバイルアプリ開発",
    startDate: new Date(2025, 4, 1),
    endDate: new Date(2025, 7, 20),
    category: "受託開発",
    progress: 60
  },
  {
    name: "AIチャットボット",
    startDate: new Date(2025, 5, 15),
    endDate: new Date(2025, 8, 30),
    category: "自社サービス",
    progress: 40
  }
];

const categoryColors: Record<string, string> = {
  "受託開発": "#1D97B0",
  "自社サービス": "#00C4A7", 
  "コンサル": "#0EA5E9"
};

export default function ProjectTimelineChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 40, right: 40, bottom: 60, left: 120 };
    const containerWidth = containerRef.current.clientWidth;
    const width = Math.max(containerWidth - margin.left - margin.right, 600);
    const height = 400 - margin.bottom - margin.top;

    // Update SVG dimensions
    svg.attr("width", containerWidth).attr("height", 400);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Time scale
    const timeExtent = d3.extent([
      ...projectData.map(d => d.startDate),
      ...projectData.map(d => d.endDate)
    ]) as [Date, Date];

    const xScale = d3.scaleTime()
      .domain(timeExtent)
      .range([0, width]);

    // Project scale
    const yScale = d3.scaleBand()
      .domain(projectData.map(d => d.name))
      .range([0, height])
      .padding(0.2);

    // Create timeline bars
    const bars = g.selectAll(".timeline-bar")
      .data(projectData)
      .enter()
      .append("g")
      .attr("class", "timeline-bar");

    // Background bars (full timeline)
    bars.append("rect")
      .attr("x", (d: ProjectData) => xScale(d.startDate))
      .attr("y", (d: ProjectData) => yScale(d.name)!)
      .attr("width", (d: ProjectData) => xScale(d.endDate) - xScale(d.startDate))
      .attr("height", yScale.bandwidth())
      .attr("fill", "rgba(255, 255, 255, 0.1)")
      .attr("rx", 8)
      .attr("stroke", "rgba(255, 255, 255, 0.2)")
      .attr("stroke-width", 1);

    // Progress bars
    bars.append("rect")
      .attr("x", (d: ProjectData) => xScale(d.startDate))
      .attr("y", (d: ProjectData) => yScale(d.name)!)
      .attr("width", 0)
      .attr("height", yScale.bandwidth())
      .attr("fill", (d: ProjectData) => categoryColors[d.category])
      .attr("rx", 8)
      .attr("opacity", 0.8)
      .transition()
      .duration(1500)
      .delay((d: ProjectData, i: number) => i * 200)
      .attr("width", (d: ProjectData) => (xScale(d.endDate) - xScale(d.startDate)) * (d.progress / 100));

    // Progress text
    bars.append("text")
      .attr("x", (d: ProjectData) => xScale(d.startDate) + (xScale(d.endDate) - xScale(d.startDate)) / 2)
      .attr("y", (d: ProjectData) => yScale(d.name)! + yScale.bandwidth() / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "white")
      .attr("font-size", "12px")
      .attr("font-weight", "600")
      .text((d: ProjectData) => `${d.progress}%`)
      .attr("opacity", 0)
      .transition()
      .duration(800)
      .delay((d: ProjectData, i: number) => i * 200 + 800)
      .attr("opacity", 1);

    // Category legends
    bars.append("circle")
      .attr("cx", (d: ProjectData) => xScale(d.startDate) - 10)
      .attr("cy", (d: ProjectData) => yScale(d.name)! + yScale.bandwidth() / 2)
      .attr("r", 4)
      .attr("fill", (d: ProjectData) => categoryColors[d.category])
      .attr("opacity", 0)
      .transition()
      .duration(600)
      .delay((d: ProjectData, i: number) => i * 200 + 400)
      .attr("opacity", 1);

    // Y-axis (project names)
    g.append("g")
      .selectAll(".y-axis-label")
      .data(projectData)
      .enter()
      .append("text")
      .attr("class", "y-axis-label")
      .attr("x", -10)
      .attr("y", (d: ProjectData) => yScale(d.name)! + yScale.bandwidth() / 2)
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle")
      .attr("fill", "rgba(255, 255, 255, 0.8)")
      .attr("font-size", "13px")
      .attr("font-weight", "500")
      .text((d: ProjectData) => d.name)
      .attr("opacity", 0)
      .transition()
      .duration(600)
      .delay((d: ProjectData, i: number) => i * 100)
      .attr("opacity", 1);

    // X-axis
    const xAxis = d3.axisBottom(xScale)
      .tickFormat((domainValue: d3.AxisDomain) => {
        return d3.timeFormat("%Y/%m")(domainValue as Date);
      });

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis as any)
      .selectAll("text")
      .attr("fill", "rgba(255, 255, 255, 0.7)")
      .attr("font-size", "12px");

    g.selectAll(".domain, .tick line")
      .attr("stroke", "rgba(255, 255, 255, 0.2)");

    // Title
    svg.append("text")
      .attr("x", margin.left + width / 2)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-size", "16px")
      .attr("font-weight", "600")
      .text("プロジェクト進捗タイムライン")
      .attr("opacity", 0)
      .transition()
      .duration(800)
      .attr("opacity", 1);

    // Legend
    const legend = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${height + margin.top + 30})`);

    const categories = Object.keys(categoryColors);
    const legendItems = legend.selectAll(".legend-item")
      .data(categories)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d: string, i: number) => `translate(${i * 120}, 0)`);

    legendItems.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 5)
      .attr("fill", (d: string) => categoryColors[d])
      .attr("opacity", 0)
      .transition()
      .duration(600)
      .delay(1000)
      .attr("opacity", 1);

    legendItems.append("text")
      .attr("x", 12)
      .attr("y", 0)
      .attr("dominant-baseline", "middle")
      .attr("fill", "rgba(255, 255, 255, 0.8)")
      .attr("font-size", "12px")
      .text((d: string) => d)
      .attr("opacity", 0)
      .transition()
      .duration(600)
      .delay(1000)
      .attr("opacity", 1);

  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <svg
        ref={svgRef}
        className="w-full h-auto"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </motion.div>
  );
}