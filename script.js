// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Theme toggle functionality
    const themeToggle = document.getElementById("theme-toggle")
    const body = document.body
  
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme")
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
  
    // Set initial theme based on saved preference or system preference
    if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
      body.classList.add("dark-theme")
    }
  
    // Toggle theme when button is clicked
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-theme")
  
      // Save theme preference
      if (body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark")
      } else {
        localStorage.setItem("theme", "light")
      }
    })
  
    // Listen for system theme changes
    prefersDarkScheme.addEventListener("change", (e) => {
      // Only change theme if user hasn't set a preference
      if (!localStorage.getItem("theme")) {
        if (e.matches) {
          body.classList.add("dark-theme")
        } else {
          body.classList.remove("dark-theme")
        }
      }
    })
  
    // Set current year in footer
    document.getElementById("currentYear").textContent = new Date().getFullYear()
  
    // Typing effect for hero section
    const typedTextElement = document.querySelector(".typed-text")
    const textArray = ["Software Developer", "Frontend Specialist", "UI/UX Enthusiast", "Problem Solver", "Web Developer", "Scheduling Coordinator"]
    let textIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typingDelay = 100
    const erasingDelay = 50
    const newTextDelay = 2000
  
    function type() {
      const currentText = textArray[textIndex]
  
      if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1)
        charIndex--
        typingDelay = erasingDelay
      } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1)
        charIndex++
        typingDelay = 100
      }
  
      if (!isDeleting && charIndex === currentText.length) {
        typingDelay = newTextDelay
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        textIndex = (textIndex + 1) % textArray.length
        typingDelay = 500
      }
  
      setTimeout(type, typingDelay)
    }
  
    if (typedTextElement) {
      setTimeout(type, newTextDelay)
    }
  
    // Navigation toggle for mobile
    const navToggle = document.getElementById("navToggle")
    const navLinks = document.querySelector(".nav-links")
  
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  
    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active")
        navLinks.classList.remove("active")
      })
    })
  
    // Sticky header on scroll
    const header = document.querySelector("header")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  
    // Scroll to top button
    const scrollTopBtn = document.querySelector(".scroll-top")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add("active")
      } else {
        scrollTopBtn.classList.remove("active")
      }
    })
  
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  
    // Skills tabs
    const skillTabs = document.querySelectorAll(".skill-tab")
    const skillGroups = document.querySelectorAll(".skills-group")
  
    skillTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs
        skillTabs.forEach((t) => t.classList.remove("active"))
        // Add active class to clicked tab
        tab.classList.add("active")
  
        // Hide all skill groups
        skillGroups.forEach((group) => group.classList.remove("active"))
  
        // Show the corresponding skill group
        const target = tab.getAttribute("data-target")
        document.getElementById(target).classList.add("active")
      })
    })
  
    // Project filtering
    const filterBtns = document.querySelectorAll(".filter-btn")
    const projectCards = document.querySelectorAll(".project-card")
  
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        filterBtns.forEach((btn) => btn.classList.remove("active"))
        // Add active class to clicked button
        this.classList.add("active")
  
        const filter = this.getAttribute("data-filter")
  
        projectCards.forEach((card) => {
          if (filter === "all" || card.getAttribute("data-category") === filter) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
        })
      })
    })
  
    // Animate stats counter
    const statsSection = document.querySelector(".about-stats")
    const statNumbers = document.querySelectorAll(".stat-number")
    const statValues = [20, 15, 15] // Projects, Clients, Feedback
    let animated = false
  
    function animateStats() {
      if (animated) return
  
      statNumbers.forEach((stat, index) => {
        const targetValue = statValues[index]
        let currentValue = 0
        const increment = Math.ceil(targetValue / 50)
        const duration = 1500 // Animation duration in ms
        const interval = duration / (targetValue / increment)
  
        // Animate the number
        const counter = setInterval(() => {
          currentValue += increment
  
          if (currentValue >= targetValue) {
            stat.textContent = targetValue
            clearInterval(counter)
          } else {
            stat.textContent = currentValue
          }
        }, interval)
      })
  
      animated = true
    }
  
    // Animate skill bars
    function animateSkillBars() {
      const skillBars = document.querySelectorAll(".skill-progress")
  
      skillBars.forEach((bar) => {
        const width = bar.style.width
        bar.style.width = "0"
  
        setTimeout(() => {
          bar.style.width = width
        }, 100)
      })
    }
  
    // Check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect()
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      )
    }
  
    // Animate elements when scrolled into view
    window.addEventListener("scroll", () => {
      if (statsSection && isInViewport(statsSection)) {
        animateStats()
      }
  
      const skillsSection = document.querySelector(".skills-section")
      if (skillsSection && isInViewport(skillsSection)) {
        animateSkillBars()
      }
    })
  
    // Check on page load as well
    if (statsSection && isInViewport(statsSection)) {
      animateStats()
    }
  
    const skillsSection = document.querySelector(".skills-section")
    if (skillsSection && isInViewport(skillsSection)) {
      animateSkillBars()
    }
  
    // Code Puzzle Game
    const codeBlocks = document.querySelectorAll(".code-block")
    const codeBlocksContainer = document.querySelector(".code-blocks-container")
    const codeSolutionContainer = document.querySelector(".code-solution-container")
    const codeSolutionPlaceholder = document.querySelector(".code-solution-placeholder")
    const checkSolutionBtn = document.getElementById("checkSolution")
    const resetPuzzleBtn = document.getElementById("resetPuzzle")
    const puzzleFeedback = document.getElementById("puzzleFeedback")
  
    let draggedItem = null
  
    if (codeBlocks.length > 0) {
      // Initialize drag and drop functionality
      codeBlocks.forEach((block) => {
        // Drag start
        block.addEventListener("dragstart", function () {
          draggedItem = this
          setTimeout(() => {
            this.classList.add("dragging")
          }, 0)
        })
  
        // Drag end
        block.addEventListener("dragend", function () {
          this.classList.remove("dragging")
          draggedItem = null
        })
  
        // Click to move (mobile support)
        block.addEventListener("click", function () {
          if (this.parentNode === codeBlocksContainer) {
            // Move to solution container
            codeSolutionContainer.appendChild(this)
            if (codeSolutionContainer.contains(codeSolutionPlaceholder)) {
              codeSolutionPlaceholder.style.display = "none"
            }
          } else {
            // Move back to blocks container
            codeBlocksContainer.appendChild(this)
            if (codeSolutionContainer.querySelectorAll(".code-block").length === 0) {
              codeSolutionPlaceholder.style.display = "block"
            }
          }
        })
      })
  
      // Container drag over
      codeSolutionContainer.addEventListener("dragover", (e) => {
        e.preventDefault()
      })
  
      // Container drop
      codeSolutionContainer.addEventListener("drop", function (e) {
        e.preventDefault()
        if (draggedItem) {
          this.appendChild(draggedItem)
          codeSolutionPlaceholder.style.display = "none"
        }
      })
  
      // Original container drag over
      codeBlocksContainer.addEventListener("dragover", (e) => {
        e.preventDefault()
      })
  
      // Original container drop
      codeBlocksContainer.addEventListener("drop", function (e) {
        e.preventDefault()
        if (draggedItem) {
          this.appendChild(draggedItem)
          if (codeSolutionContainer.querySelectorAll(".code-block").length === 0) {
            codeSolutionPlaceholder.style.display = "block"
          }
        }
      })
  
      // Check solution
      checkSolutionBtn.addEventListener("click", () => {
        const solutionBlocks = codeSolutionContainer.querySelectorAll(".code-block")
  
        if (solutionBlocks.length !== 9) {
          puzzleFeedback.textContent = "Please place all code blocks in the solution area."
          puzzleFeedback.className = "code-puzzle-feedback error"
          return
        }
  
        let isCorrect = true
        let currentOrder = 1
  
        solutionBlocks.forEach((block) => {
          if (Number.parseInt(block.getAttribute("data-order")) !== currentOrder) {
            isCorrect = false
          }
          currentOrder++
        })
  
        if (isCorrect) {
          puzzleFeedback.textContent = "Congratulations! Your solution is correct!"
          puzzleFeedback.className = "code-puzzle-feedback success"
          showToast("Great job! You solved the coding puzzle!", "success")
          triggerConfetti()
        } else {
          puzzleFeedback.textContent = "Not quite right. Try again!"
          puzzleFeedback.className = "code-puzzle-feedback error"
        }
      })
  
      // Reset puzzle
      resetPuzzleBtn.addEventListener("click", () => {
        // Move all blocks back to the original container
        const solutionBlocks = Array.from(codeSolutionContainer.querySelectorAll(".code-block"))
        solutionBlocks.forEach((block) => {
          codeBlocksContainer.appendChild(block)
        })
  
        // Show placeholder
        codeSolutionPlaceholder.style.display = "block"
  
        // Clear feedback
        puzzleFeedback.textContent = ""
        puzzleFeedback.className = "code-puzzle-feedback"
      })
    }
  
    // Skill Match Analyzer
    const analyzeSkillsBtn = document.getElementById("analyzeSkills")
    const skillMatchResults = document.getElementById("skillMatchResults")
    const skillMatchPlaceholder = document.querySelector(".skill-match-placeholder")
  
    if (analyzeSkillsBtn) {
      analyzeSkillsBtn.addEventListener("click", () => {
        const jobDescription = document.getElementById("jobDescription").value.toLowerCase()
  
        if (!jobDescription) {
          skillMatchResults.innerHTML = '<div class="skill-match-error">Please paste a job description to analyze.</div>'
          return
        }
  
        // Hide placeholder
        skillMatchPlaceholder.style.display = "none"
  
        // Show loading
        skillMatchResults.innerHTML = '<div class="skill-match-loading">Analyzing job description...</div>'
  
        // Define skills to look for
        const skillCategories = {
          frontend: [
            "html",
            "css",
            "javascript",
            "react",
            "vue",
            "angular",
            "responsive",
            "sass",
            "less",
            "webpack",
            "babel",
          ],
          backend: ["node", "express", "mongodb", "sql", "database", "api", "rest", "graphql", "php", "python", "java"],
          devops: ["git", "ci/cd", "docker", "kubernetes", "aws", "cloud", "deployment", "jenkins", "terraform"],
          soft: ["team", "communication", "problem solving", "agile", "scrum", "leadership", "collaboration"],
        }
  
        // Simulate analysis
        setTimeout(() => {
          // Count matches
          const matches = {}
          let totalMatches = 0
          let totalSkills = 0
  
          for (const category in skillCategories) {
            matches[category] = {
              matched: [],
              total: skillCategories[category].length,
            }
  
            skillCategories[category].forEach((skill) => {
              if (jobDescription.includes(skill)) {
                matches[category].matched.push(skill)
                totalMatches++
              }
              totalSkills++
            })
          }
  
          // Calculate match percentage
          const matchPercentage = Math.round((totalMatches / totalSkills) * 100)
  
          // Generate results HTML
          let resultsHTML = `
            <div class="skill-match-summary">
              <div class="match-percentage">
                <div class="percentage-circle" style="--percentage: ${matchPercentage}%">
                  <div class="percentage-number">${matchPercentage}%</div>
                </div>
              </div>
              <div class="match-text">
                <h3>Overall Match</h3>
                <p>${getMatchMessage(matchPercentage)}</p>
              </div>
            </div>
            <div class="skill-match-details">
          `
  
          // Add category results
          for (const category in matches) {
            const categoryMatches = matches[category].matched.length
            const categoryTotal = matches[category].total
            const categoryPercentage = Math.round((categoryMatches / categoryTotal) * 100)
  
            resultsHTML += `
              <div class="skill-category">
                <h4>${capitalizeFirstLetter(category)} Skills</h4>
                <div class="skill-bar-container">
                  <div class="skill-bar" style="width: ${categoryPercentage}%"></div>
                  <span class="skill-percentage">${categoryPercentage}%</span>
                </div>
                <div class="matched-skills">
                  ${
                    matches[category].matched.length > 0
                      ? `<p>Matched: ${matches[category].matched.map((s) => `<span class="skill-tag">${s}</span>`).join(" ")}`
                      : "<p>No matches found in this category</p>"
                  }
                </div>
              </div>
            `
          }
  
          resultsHTML += `</div>`
  
          // Update results
          skillMatchResults.innerHTML = resultsHTML
  
          // Show toast
          showToast("Skill analysis complete!", "success")
        }, 2000)
      })
    }
  
    // Helper function for skill match messages
    function getMatchMessage(percentage) {
      if (percentage >= 90) {
        return "Excellent match! You have most of the skills required for this position."
      } else if (percentage >= 70) {
        return "Good match! You have many of the skills required for this position."
      } else if (percentage >= 50) {
        return "Moderate match. You have some of the skills required, but may need to highlight transferable skills."
      } else {
        return "This position may require skills outside your current portfolio. Consider focusing on transferable skills."
      }
    }
  
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  
    // Form tabs
    const formTabs = document.querySelectorAll(".form-tab")
    const formContents = document.querySelectorAll(".contact-form-content")
  
    if (formTabs.length > 0) {
      formTabs.forEach((tab) => {
        tab.addEventListener("click", function () {
          // Remove active class from all tabs
          formTabs.forEach((t) => t.classList.remove("active"))
          // Add active class to clicked tab
          this.classList.add("active")
  
          // Hide all form contents
          formContents.forEach((content) => content.classList.remove("active"))
  
          // Show the corresponding form content
          const target = this.getAttribute("data-form")
          document.getElementById(`${target}Form`).classList.add("active")
        })
      })
    }
  
    // Contact forms
    const contactForms = [
      document.getElementById("generalForm"),
      document.getElementById("jobForm"),
      document.getElementById("projectForm"),
    ]
  
    contactForms.forEach((form) => {
      if (form) {
        form.addEventListener("submit", (e) => {
          e.preventDefault()
  
          // Show loading in form status
          const formStatus = document.getElementById("formStatus")
          formStatus.textContent = "Sending..."
          formStatus.className = "form-status"
  
          // Simulate sending
          setTimeout(() => {
            // Reset form
            form.reset()
  
            // Show success message
            formStatus.textContent = "Message sent successfully! I'll get back to you soon."
            formStatus.className = "form-status success"
  
            // Show toast
            showToast("Message sent successfully!", "success")
  
            // Clear success message after 5 seconds
            setTimeout(() => {
              formStatus.textContent = ""
              formStatus.className = "form-status"
            }, 5000)
          }, 1500)
        })
      }
    })
  
    // Toast notification
    function showToast(message, type = "success") {
      const toast = document.getElementById("toast")
      const toastMessage = document.querySelector(".toast-message")
      const toastIcon = document.querySelector(".toast-icon i")
  
      // Set message
      toastMessage.textContent = message
  
      // Set type
      if (type === "success") {
        toast.style.borderLeftColor = "var(--success-color)"
        toastIcon.className = "fas fa-check-circle"
        toastIcon.style.color = "var(--success-color)"
      } else if (type === "error") {
        toast.style.borderLeftColor = "var(--danger-color)"
        toastIcon.className = "fas fa-exclamation-circle"
        toastIcon.style.color = "var(--danger-color)"
      } else if (type === "info") {
        toast.style.borderLeftColor = "var(--primary-color)"
        toastIcon.className = "fas fa-info-circle"
        toastIcon.style.color = "var(--primary-color)"
      }
  
      // Show toast
      toast.classList.add("show")
  
      // Hide toast after 5 seconds
      setTimeout(() => {
        toast.classList.remove("show")
      }, 5000)
    }
  
    // Close toast on click
    const toastCloseBtn = document.querySelector(".toast-close")
    if (toastCloseBtn) {
      toastCloseBtn.addEventListener("click", () => {
        document.getElementById("toast").classList.remove("show")
      })
    }
  
    // Confetti effect
    function triggerConfetti() {
      const canvas = document.getElementById("confetti-canvas")
      const ctx = canvas.getContext("2d")
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
  
      // Confetti particles
      const particles = []
      const particleCount = 150
      const gravity = 0.5
      const colors = [
        "#3b82f6", // primary blue
        "#60a5fa", // light blue
        "#2563eb", // dark blue
        "#f97316", // orange
        "#22c55e", // green
      ]
  
      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 10 + 5,
          speed: Math.random() * 3 + 2,
          angle: Math.random() * 360,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 10 - 5,
        })
      }
  
      // Animation
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
  
        let stillActive = false
  
        particles.forEach((p) => {
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate((p.rotation * Math.PI) / 180)
  
          ctx.fillStyle = p.color
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
  
          ctx.restore()
  
          p.rotation += p.rotationSpeed
          p.y += p.speed
          p.x += Math.sin((p.angle * Math.PI) / 180) * 2
  
          if (p.y < canvas.height) {
            stillActive = true
          }
        })
  
        if (stillActive) {
          requestAnimationFrame(animate)
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
      }
  
      animate()
    }
  
    // Resume download button (simulated)
    const downloadResumeBtn = document.getElementById("downloadResume")
  
    if (downloadResumeBtn) {
      downloadResumeBtn.addEventListener("click", (e) => {
        
        showToast("Resume is opened!", "success")
      })
    }
  })
  