document.getElementById("bookingForm").addEventListener("submit", function (e) {
                      e.preventDefault();
                  
                      let arrival = document.getElementById("arrival").value;
                      let departure = document.getElementById("departure").value;
                      let guests = document.getElementById("guests").value;
                  
                      if (arrival && departure) {
                          alert(`✅ การจองสำเร็จ! \n📅 เข้าพัก: ${arrival} - ${departure} \n👥 จำนวนผู้เข้าพัก: ${guests}`);
                      } else {
                          alert("❌ กรุณากรอกข้อมูลให้ครบถ้วน");
                      }
                  });
                  