import Particles, { initParticlesEngine } from '@tsparticles/react'
import { useEffect, useMemo, useState } from 'react'
import { loadSlim } from '@tsparticles/slim'

export const ParticlesComponent = (props) => {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = (container) => {
    console.log(container)
  }
  const options = useMemo(
    () => ({
      background: {
        color: {
          value: '#000'
        }
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: 'push'
          }
        },
        modes: {
          push: {
            distance: 200,
            duration: 1
          }
        }
      },
      particles: {
        color: {
          value: '#FFFFFF'
        },
        links: {
          color: '#FFFFFF',
          distance: 150,
          enable: true,
          opacity: 0.6,
          width: 1.5
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce'
          },
          random: true,
          speed: 1,
          straight: false
        },
        number: {
          value: 250,
          density: {
            enable: true,
            value_area: 800
          }
        },
        opacity: {
          value: 0.5
        },
        shape: {
          type: 'circle'
        },
        size: {
          value: { min: 2, max: 5.5 }
        }
      },
      detectRetina: true
    }),
    []
  )

  return <Particles id={props.id} init={particlesLoaded} options={options} />
}

export default ParticlesComponent
