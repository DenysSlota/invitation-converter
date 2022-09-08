export const Success = ({ count }) => {
    return (
      <div class="success-block">
        <img src="/assets/success.svg" alt="Success" />
        <h3>Successfully!</h3>
        <p>An invitation has been sent to all {count} users.</p>
        <button onClick={() => window.location.reload()} className="send-invite-btn">Back</button>
      </div>
    );
  };