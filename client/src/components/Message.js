import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children, close }) => {
  const [show, setShow] = useState(true)
  const [dismiss, setDismiss] = useState(false)
  useEffect(() => {
    if (close) {
      setTimeout(() => setShow(false), 2500)
      setDismiss(true)
    }
  }, [close])

  return (
    <Alert
      onClose={() => setShow(false)}
      dismissible={dismiss}
      variant={variant}
      show={show}
    >
      {children}
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
