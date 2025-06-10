import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import HomeSection from '@/components/sections/HomeSection';
import AboutSection from '@/components/sections/AboutSection';
import EducationSection from '@/components/sections/EducationSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import HireSection from '@/components/sections/HireSection';
import BlogSection from '@/components/sections/BlogSection';
import CertificateSection from '@/components/sections/Certificatesection';

export default function Home() {
  return (
    <>
      <Head>
        <title>Gilbert Mugabe | Full Stack Developer</title>
        <meta name="description" content="Gilbert Mugabe's portfolio - Full Stack Developer specializing in React, TypeScript, Node.js, NestJS and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <HomeSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificateSection/>
        <BlogSection />
        <HireSection />
        <ContactSection />
        
      </Layout>
    </>
  );
}