const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

openModalBtn.onclick = function() {
  modal.style.display = 'block';
}

closeModalBtn.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

let selectElementBudget1 = document.getElementById("budget2");
selectElementBudget1.style.color = "#9e9e9e";

selectElementBudget1.addEventListener("change", function () {
    if (this.value === "") {
        this.style.color = "#9e9e9e";
    } else {
        this.style.color = "black"; 
    }
});

let bdc = document.getElementById("budget");
bdc.style.color = "#9e9e9e"
bdc.addEventListener("change",function(){
    if(this.value === ""){
        this.style.color = "#9e9e9e";
    }
    else{
        this.style.color = "black";
    }
})
function toggleForm(){
    var form = document.getElementById("contactForm");
    var overlay = document.getElementById("overla");

    if (form.style.display === "none" || form.style.display === "") {
      form.style.display = "block";
      
      overlay.style.display = "block"; 
    } else {
      closeForm();
    }
  }
  function closeForm(){
    document.getElementById("contactForm").style.display = "none";
    document.getElementById("overla").style.display = "none";
  }

const scriptURL = 'https://script.google.com/macros/s/AKfycbzXvG5I_UzVJU9cNLBzGZKG0tCRKxEpkkFU9c1cJiKRKae1rDnXf43PU8rlp-cHa8K3/exec';
const form = document.forms['submit-to-google-sheet'];
const spinner = document.getElementById('spinner');
const btnText = document.querySelector('.btn-text');
const btn = document.getElementById('btn_main');

fetch('https://api.ipify.org?format=json') 
        .then(response => response.json())
        .then(data => {
            document.getElementById('ipAddress').value = data.ip; 
    })
        .catch(error => {
            console.error('Error fetching Public IP address:', error);
});

    function getCurrentTime() {
    const currentTime = new Date();
    const IST = currentTime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    document.getElementById('time').value = IST; 
    }

    function getOperatingSystem() {
          
        var userAgent = navigator.userAgent;
        var os = "Unknown OS";

        if (userAgent.indexOf("Windows NT 10.0") !== -1) {
            os = "Windows 11";
        } 
        else if (userAgent.indexOf("Windows NT 6.1") !== -1) {
            os = "Windows 7";
        } 
        else if (userAgent.indexOf("Windows NT 6.0") !== -1) {
            os = "Windows Vista";
        } 
        else if (userAgent.indexOf("Windows NT 5.1") !== -1) {
            os = "Windows XP";
        } 
        else if (userAgent.indexOf("Mac OS X") !== -1) {
            os = "macOS";
        } 
        else if (userAgent.indexOf("Android") !== -1) {
            os = "Android";
        }
        else if (userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1) {
            os = "iOS";
        } 
        else if (userAgent.indexOf("Linux") !== -1) {
            os = "Linux";
        } 
        else if (userAgent.indexOf("X11") !== -1) {
            os = "Unix";
        }
        return os;
    }

    document.getElementById('os').value = getOperatingSystem(); 
    function getDeviceType() {
     const ua = navigator.userAgent;
     if (/Mobile|Android|iP(hone|od)/i.test(ua)) {
       return "Mobile";
     } else if (/iPad|Tablet/i.test(ua) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 1)) {
       return "Tablet";
     } else {
      return "Desktop";
     }
 }

 document.getElementById('deviceType').value = getDeviceType();

 function getPrivateIP() {
        return new Promise((resolve, reject) => {
            const RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
            if (!RTCPeerConnection) {
                reject("WebRTC not supported by the browser.");
                return;
            }
            const rtc = new RTCPeerConnection({ iceServers: [] });
            rtc.createDataChannel("");
            rtc.createOffer()
                .then(offer => rtc.setLocalDescription(offer))
                .catch(err => reject(err));

            rtc.onicecandidate = (event) => {
                if (event && event.candidate && event.candidate.candidate) {
                    const candidate = event.candidate.candidate;
                    const privateIpMatch = candidate.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/);
                    if (privateIpMatch) {
                        resolve(privateIpMatch[1]);
                   }
                }
            };
            setTimeout(() => {
                reject("Failed to find private IP address.");
            },1000); 
        });
    }
    getPrivateIP()
        .then(ip => {
            document.getElementById('privateIpAddress').value = ip;
        })
        .catch(error => {
            console.error('Error fetching Private IP address:', error);
        });

form.addEventListener('submit', e => {
    e.preventDefault();
    getCurrentTime()
    if (validation()) {
        spinner.style.display = 'inline-block';
        btnText.classList.add('hide-text');
        btn.disabled = true;

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                console.log('Success!', response);
                form.reset();
                window.location.href = 'Thankyou.html';
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('There was an error submitting the form.');
            })
            .finally(() => {
                spinner.style.display = 'none';
                btnText.classList.remove('hide-text');
                btn.disabled = false;
            });
     }
});

function validation() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("number").value;
    let email = document.getElementById("email").value;
    let isValid = true;

    document.getElementById("nameError").textContent = "";
    document.getElementById("numberError").textContent = "";
    document.getElementById("emailError").textContent = "";

    document.getElementById("name").style.borderColor = "";
    document.getElementById("number").style.borderColor = "";
    document.getElementById("email").style.borderColor = ""

    if (!/^[a-zA-Z\s]+$/.test(name) || name.length < 3 || name.length > 29) {
        document.getElementById("nameError").textContent = "Invalid Name";
        document.getElementById("name").style.borderColor = "red";
            isValid = false;
        }
    if (isNaN(phone) || phone.length != 10) {
        document.getElementById("numberError").textContent = "Invalid Phone Number";
        document.getElementById("number").style.borderColor = "red";
        isValid = false;
    }
    else if (phone.startsWith("1") || (phone.startsWith("2")) || (phone.startsWith("3")) || (phone.startsWith("4")) || (phone.startsWith("5"))) {
        document.getElementById("numberError").textContent = "Phone number cannot start with 1 2 3 4 5";
        document.getElementById("number").style.borderColor = "red";
        isValid = false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "Invalid Email";
        document.getElementById("email").style.borderColor = "red";

        isValid = false;
    }
    return isValid;
}
const scriptURL1 = 'https://script.google.com/macros/s/AKfycbzXvG5I_UzVJU9cNLBzGZKG0tCRKxEpkkFU9c1cJiKRKae1rDnXf43PU8rlp-cHa8K3/exec';
        const form1 = document.forms['submit-to-google-sheet1'];
        const spinner1 = document.getElementById('spinner1');
        const btn1 = document.getElementById('btn_main1');
        const btnText1 = document.querySelector('.btn-text1');

        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                document.getElementById('ipAddress1').value = data.ip;
            })
            .catch(error => console.error('Error fetching IP:', error));
        
            function getOperatingSystem1() {
                  
                  var userAgent1 = navigator.userAgent;
                  var os = "Unknown OS";
          
                  if (userAgent1.indexOf("Windows NT 10.0") !== -1) {
                      os = "Windows 11";
                  } 
                  else if (userAgent1.indexOf("Windows NT 6.1") !== -1) {
                      os = "Windows 7";
                  } 
                  else if (userAgent1.indexOf("Windows NT 6.0") !== -1) {
                      os = "Windows Vista";
                  } 
                  else if (userAgent1.indexOf("Windows NT 5.1") !== -1) {
                      os = "Windows XP";
                  } 
                  else if (userAgent1.indexOf("Mac OS X") !== -1) {
                      os = "macOS";
                  } 
                  else if (userAgent1.indexOf("Android") !== -1) {
                      os = "Android";
                  }
                  else if (userAgent1.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1) {
                      os = "iOS";
                  } 
                  else if (userAgent1.indexOf("Linux") !== -1) {
                      os = "Linux";
                  } 
                  else if (userAgent1.indexOf("X11") !== -1) {
                      os = "Unix";
                  }
                  return os;
              }
      
              document.getElementById('os1').value = getOperatingSystem1(); 
              function getDeviceType1() {
               const ua1 = navigator.userAgent;
               if (/Mobile|Android|iP(hone|od)/i.test(ua1)) {
                 return "Mobile";
               } else if (/iPad|Tablet/i.test(ua1) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 1)) {
                 return "Tablet";
                 } else {
                return "Desktop";
                }
              }
      
           document.getElementById('deviceType1').value = getDeviceType1();
      
              function getPrivateIP1() {
                  return new Promise((resolve, reject) => {
                      const RTCPeerConnection1 = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
                      if (!RTCPeerConnection1) {
                          reject("WebRTC not supported by the browser.");
                          return;
                      }
                      const rtc1 = new RTCPeerConnection({ iceServers: [] });
                      rtc1.createDataChannel("");
                      rtc1.createOffer()
                          .then(offer => rtc.setLocalDescription(offer))
                          .catch(err => reject(err));
      
                      rtc1.onicecandidate = (event) => {
                          if (event && event.candidate && event.candidate.candidate) {
                              const candidate = event.candidate.candidate;
                              const privateIpMatch = candidate.match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/);
                              if (privateIpMatch) {
                                  resolve(privateIpMatch[1]);
                              }
                          }
                      };
                      setTimeout(() => {
                          reject("Failed to find private IP address.");
                      },1000); 
                  });
              }
              getPrivateIP1()
                  .then(ip => {
                      document.getElementById('privateIpAddress1').value = ip;
                  })
                  .catch(error => {
                      console.error('Error fetching Private IP address:', error);
                  });
  

        function getCurrentTime1() {
            const currentTime1 = new Date();
            const IST1 = currentTime1.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
            document.getElementById('time1').value = IST1; 
        }

        form1.addEventListener('submit', e => {
            e.preventDefault();
            getCurrentTime1();

            if (validation1()) {
                spinner1.style.display = 'inline-block';
                btn1.disabled = true;
                btnText1.classList.add('hide-text');

                fetch(scriptURL1, { method: 'POST', body: new FormData(form1) })
                    .then(response => {
                        console.log('Success!', response);
                        form1.reset();
                        window.location.href = 'Thankyou.html';
                    })
                    .catch(error => alert('Error submitting form: ' + error))
                    .finally(() => {
                        spinner1.style.display = 'none';
                        btn1.disabled = false;
                    });
            }
        });

        function validation1() {
            let name = document.getElementById("name1").value.trim();
            let phone = document.getElementById("number1").value.trim();
            let email = document.getElementById("email1").value.trim();
            let isValid = true;

            document.getElementById("nameError1").textContent = "";
            document.getElementById("numberError1").textContent = "";
            document.getElementById("emailError1").textContent = "";

            document.getElementById("name1").style.borderColor = "";
            document.getElementById("number1").style.borderColor = "";
            document.getElementById("email1").style.borderColor = ""

            if (!/^[a-zA-Z\s]+$/.test(name) || name.length < 3) {
                document.getElementById("nameError1").textContent = "Invalid Name";
                document.getElementById("name1").style.borderColor = "rgb(255, 63, 63)";
                isValid = false;
            }
            if (!/^\d{10}$/.test(phone)) {
                document.getElementById("numberError1").textContent = "Invalid Phone Number";
                document.getElementById("number1").style.borderColor = "rgb(255, 63, 63)"
                isValid = false;
            }
            else if (phone.startsWith("1") || (phone.startsWith("2")) || (phone.startsWith("3")) || (phone.startsWith("4")) || (phone.startsWith("5"))) {
                document.getElementById("numberError1").textContent = "Phone number cannot start with 1 2 3 4 5";
                document.getElementById("number1").style.borderColor = "rgb(255, 63, 63)"
                isValid = false;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById("emailError1").textContent = "Invalid Email";
                document.getElementById("email1").style.borderColor = "rgb(255, 63, 63)"
                isValid = false;
            }
            return isValid;
        }
        const scriptURL2 = 'https://script.google.com/macros/s/AKfycbzXvG5I_UzVJU9cNLBzGZKG0tCRKxEpkkFU9c1cJiKRKae1rDnXf43PU8rlp-cHa8K3/exec';
        const form2 = document.forms['submit-to-google-sheet2'];
        const spinner2 = document.getElementById('spinner2');
        const btn2 = document.getElementById('btn_main2');
        
        fetch('https://api.ipify.org?format=json') 
            .then(response => response.json())
            .then(data => {
                document.getElementById('ipAddress2').value = data.ip; 
            })
            .catch(error => {
                console.error('Error fetching Public IP address:', error);
            });
    
        function getCurrentTime2() {
            const currentTime2 = new Date();
            const IST2 = currentTime2.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
            document.getElementById('time2').value = IST2; 
        }
    
        function getOperatingSystem2() {
            var userAgent2 = navigator.userAgent;
            var os = "Unknown OS";
    
            if (userAgent2.indexOf("Windows NT 10.0") !== -1) {
                os = "Windows 11";
            } else if (userAgent2.indexOf("Windows NT 6.1") !== -1) {
                os = "Windows 7";
            } else if (userAgent2.indexOf("Windows NT 6.0") !== -1) {
                os = "Windows Vista";
            } else if (userAgent2.indexOf("Windows NT 5.1") !== -1) {
                os = "Windows XP";
            } else if (userAgent2.indexOf("Mac OS X") !== -1) {
                os = "macOS";
            } else if (userAgent2.indexOf("Android") !== -1) {
                os = "Android";
            } else if (userAgent2.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1) {
                os = "iOS";
            } else if (userAgent2.indexOf("Linux") !== -1) {
                os = "Linux";
            } else if (userAgent2.indexOf("X11") !== -1) {
                os = "Unix";
            }
            return os;
        }
    
        document.getElementById('os2').value = getOperatingSystem2(); 
    
        function getDeviceType2() {
            const ua2 = navigator.userAgent;
            if (/Mobile|Android|iP(hone|od)/i.test(ua2)) {
                return "Mobile";
            } else if (/iPad|Tablet/i.test(ua2) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 1)) {
                return "Tablet";
            } else {
                return "Desktop";
            }
        }
        document.getElementById('deviceType2').value = getDeviceType2();
    
        form2.addEventListener('submit', e => {
            e.preventDefault();
            getCurrentTime2();
    
            if (validation2()) {
                const btnText2 = document.querySelector('.button-text2');
                btnText2.classList.add('hide-text2');  
                btn2.disabled = true;
                spinner2.style.display = 'inline-block';  
    
                fetch(scriptURL2, { method: 'POST', body: new FormData(form2) })
                    .then(response => {
                        form2.reset(); 
                        window.location.href = 'Thankyou.html';
                    })
                    .catch(error => {
                        console.error('Error!', error.message);
                        alert('There was an error submitting the form.');
                    })
                    .finally(() => {
                        spinner2.style.display = 'none';  
                        btnText2.classList.remove('hide-text2');  
                        btn2.disabled = false;
                    });
            }
        });
        function validation2() {
            let name = document.getElementById("name2").value;
            let phone = document.getElementById("number2").value;
            let email = document.getElementById("email2").value;
            let isValid = true;
    
            document.getElementById("nameError2").textContent = "";
            document.getElementById("numberError2").textContent = "";
            document.getElementById("emailError2").textContent = "";

            document.getElementById("name2").style.borderColor = "";
            document.getElementById("number2").style.borderColor = "";
            document.getElementById("email2").style.borderColor = "";
    
            if (!/^[a-zA-Z\s]+$/.test(name) || name.length < 3 || name.length > 29) {
                document.getElementById("nameError2").textContent = "Invalid Name";
                document.getElementById("name2").style.borderColor = "red";
                isValid = false;
            }
            if (isNaN(phone) || phone.length !== 10) {
                document.getElementById("numberError2").textContent = "Enter valid 10 digit phone number";
                document.getElementById("number2").style.borderColor = "red";
                isValid = false;
            }
            else if (phone.startsWith("1") || (phone.startsWith("2")) || (phone.startsWith("3")) || (phone.startsWith("4")) || (phone.startsWith("5"))) {
                document.getElementById("numberError2").textContent = "Phone number cannot start with 1 2 3 4 5";
                document.getElementById("number2").style.borderColor = "red";
                isValid = false;
            }
            const emailPattern2 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern2.test(email)) {
                document.getElementById("emailError2").textContent = "Invalid Email";
                document.getElementById("number2").style.borderColor = "red";
                isValid = false;
            }
            return isValid;
        }

    let clr1 = document.getElementById('name1');
    clr1.addEventListener('input',function(){
            this.style.color = '#26465F';
    });
    let clr2 = document.getElementById('email1');
    clr2.addEventListener('input',function(){
        this.style.color = '#26465F';
    })
    let clr3 = document.getElementById('number1');
    clr3.addEventListener('input',function(){
        this.style.color = '#26465F'
    })

