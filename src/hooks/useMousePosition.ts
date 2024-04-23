import React from 'react'

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = React.useState<{
    x: Nullable<number>
    y: Nullable<number>
  }>({ x: null, y: null })
  React.useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])
  return mousePosition
}

export default useMousePosition
