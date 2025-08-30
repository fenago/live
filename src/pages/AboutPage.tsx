import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutPage.scss';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <div className="about-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Ethics Lab
        </button>
        <img 
          src="/mdc_logo2.png" 
          alt="Miami Dade College Logo" 
          className="mdc-logo"
        />
      </div>

      <div className="about-container">
        <div className="about-content">
          <h1 className="page-title">About MDC Ethics Lab</h1>
          <p className="tagline">Empowering Ethical Thinking in the Age of AI</p>

          <section className="intro-section">
            <p>
              MDC Ethics Lab is an innovative AI-powered ethics toolbox designed to help Miami Dade College students 
              develop critical thinking skills through philosophical inquiry. As a winner of the President's Innovation 
              Fund (Round 4), our project represents MDC's commitment to preparing students for an AI-driven future 
              while fostering deep metacognitive skills and ethical reasoning.
            </p>
          </section>

          <section className="mission-section">
            <h2>Our Mission</h2>
            <p>
              We believe that as artificial intelligence transforms our world, the ability to think critically about 
              ethical implications becomes essential. MDC Ethics Lab doesn't just teach students what to think about 
              AI and ethics—it teaches them <em>how</em> to think about these complex issues. Through Socratic dialogue, 
              diverse philosophical perspectives, and real-world Miami-relevant scenarios, we're building the ethical 
              leaders of tomorrow.
            </p>
          </section>

          <section className="vision-section">
            <h2>Meeting MDC's Vision</h2>
            
            <div className="subsection">
              <h3>Advancing the Quality Enhancement Plan (QEP)</h3>
              <p>Our tool directly supports MDC's QEP focus on AI readiness by addressing all three student learning outcomes:</p>
              <ul>
                <li><strong>Identifying AI Fundamentals:</strong> Students explore AI concepts through ethical lenses, understanding not just how AI works, but why it matters</li>
                <li><strong>Analyzing Ethical Challenges:</strong> The heart of our tool—students engage with real ethical dilemmas surrounding AI bias, privacy, automation, and responsible development</li>
                <li><strong>Applying AI Technologies:</strong> Students interact with an AI system while simultaneously learning to critique and evaluate AI's role in society</li>
              </ul>
            </div>

            <div className="subsection">
              <h3>President's Innovation Fund Priorities</h3>
              
              <div className="priority-card">
                <h4>Preparation for the Future</h4>
                <p>
                  Students engage directly with AI technology while developing the critical thinking skills essential 
                  for navigating an AI-transformed workforce. By wrestling with ethical questions about automation, 
                  bias, and digital rights, they're preparing for careers where these issues will be central.
                </p>
              </div>

              <div className="priority-card">
                <h4>Enhanced Learning Experiences</h4>
                <p>
                  Our AI adapts to each student's reasoning style, providing personalized philosophical guidance that 
                  connects classical wisdom to contemporary challenges. From Aristotle to algorithmic justice, from 
                  Kant to climate ethics, students explore timeless questions through modern lenses.
                </p>
              </div>

              <div className="priority-card">
                <h4>Accessibility</h4>
                <p>
                  Currently piloting across multiple MDC campuses and disciplines, our tool is designed with MDC's 
                  diverse student body in mind. Featuring multilingual support in English, Spanish, and Haitian Creole, 
                  MDC Ethics Lab ensures that students can engage with complex philosophical concepts in their preferred 
                  language. The system adapts to serve multilingual learners, first-generation college students, and 
                  working professionals by making philosophy accessible through familiar Miami-based examples, culturally 
                  relevant scenarios, and clear, jargon-free explanations. Whether a student is more comfortable 
                  discussing "dignidad" or "dignity," "libète" or "freedom," our tool meets them where they are, 
                  honoring the linguistic diversity that makes MDC unique.
                </p>
              </div>

              <div className="priority-card">
                <h4>Teaching Innovation</h4>
                <p>
                  Faculty across MDC's campuses are integrating the tool into diverse disciplines—from computer science 
                  courses exploring AI ethics to philosophy classes examining moral reasoning, from nursing programs 
                  discussing medical ethics to business courses covering corporate responsibility. This cross-disciplinary 
                  implementation demonstrates the universal relevance of ethical thinking in every field of study.
                </p>
              </div>
            </div>
          </section>

          <section className="approach-section">
            <h2>Our Approach</h2>
            <p>MDC Ethics Lab's unique approach combines:</p>
            <ul className="approach-list">
              <li><strong>Metacognitive Focus:</strong> Teaching students to think about their own thinking processes</li>
              <li><strong>Philosophical Grounding:</strong> Connecting every discussion to diverse philosophical traditions</li>
              <li><strong>Cultural Relevance:</strong> Incorporating Miami's multicultural perspectives and real-world examples</li>
              <li><strong>Visual Learning:</strong> Auto-generating graphs and visualizations to illustrate complex ethical relationships</li>
              <li><strong>Career Alignment:</strong> Linking ethical reasoning to students' professional paths</li>
            </ul>
          </section>

          <section className="team-section">
            <h2>The Team</h2>
            <p className="team-intro">
              Our interdisciplinary team brings together expertise in philosophy, AI, and pedagogy from across MDC's campuses:
            </p>
            <div className="team-grid">
              <div className="team-member">
                <h4>Dr. Darrell Arnold</h4>
                <p className="role">Philosophy, North Campus</p>
                <p className="contribution">Leading the integration of classical and contemporary philosophical frameworks</p>
              </div>
              <div className="team-member">
                <h4>Dr. Ernesto Lee</h4>
                <p className="role">AI & Data Analytics, Kendall Campus</p>
                <p className="contribution">Architecting the AI systems and ensuring technical innovation</p>
              </div>
              <div className="team-member">
                <h4>Professor Sarah Jacob</h4>
                <p className="role">Philosophy, West Campus</p>
                <p className="contribution">Developing culturally responsive ethical scenarios and student engagement strategies</p>
              </div>
              <div className="team-member">
                <h4>Dr. A.J. Kreider</h4>
                <p className="role">Philosophy, Homestead Campus</p>
                <p className="contribution">Designing metacognitive assessments and learning outcomes</p>
              </div>
              <div className="team-member">
                <h4>Professor Matthew Sang</h4>
                <p className="role">Philosophy and Humanities, Padrón Campus</p>
                <p className="contribution">Bridging humanities perspectives with AI ethics and fostering interdisciplinary connections</p>
              </div>
            </div>
          </section>

          <section className="future-section">
            <h2>Looking Forward</h2>
            <p>
              As we pilot MDC Ethics Lab across multiple campuses and disciplines, we're not just building a tool—we're 
              cultivating a community of ethical thinkers prepared to shape AI's role in society. Our vision extends 
              beyond the classroom, empowering MDC students to become ethical leaders in Miami's diverse communities 
              and beyond.
            </p>
            <p>
              Whether you're a student exploring your first philosophical question, a faculty member integrating ethics 
              into your curriculum, or a community member interested in AI's impact on society, MDC Ethics Lab is here 
              to guide your journey toward deeper understanding and more thoughtful engagement with the ethical challenges 
              of our time.
            </p>
          </section>

          <section className="acknowledgments">
            <h2>Acknowledgments</h2>
            <p>
              We extend our deepest gratitude to President Madeline Pumariega and Provost Malou C. Harrison for their 
              visionary leadership and unwavering support of innovative teaching at Miami Dade College. Their commitment 
              to student success and educational excellence through the President's Innovation Fund has made MDC Ethics 
              Lab possible.
            </p>
          </section>

          <div className="footer-note">
            <p>
              <em>MDC Ethics Lab is a President's Innovation Fund project supporting Miami Dade College's commitment 
              to student success, innovation in teaching, and preparation for an AI-enhanced future.</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
