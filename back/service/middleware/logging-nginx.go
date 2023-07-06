package middleware

import (
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"sync"
	"time"

	"akosarev.info/youknow/initializers"
	"github.com/gin-gonic/gin"
)

// NginxLogMiddleware 为记录CF原始IP
func NginxLogMiddleware() gin.HandlerFunc {
	config, _ := initializers.LoadConfig(".")

	return func(c *gin.Context) {
		var bodySize int
		// todo 拿到目录路径
		// todo 拿到将要合成的信息
		ip := c.ClientIP()
		utcTimeStr := time.Now().Format("02/Jan/2006:15:04:05")
		url := c.Request.URL
		method := c.Request.Method
		status := c.Writer.Status()
		body, err := ioutil.ReadAll(c.Request.Body)
		http := c.Request.Proto
		if err != nil {
			bodySize = -1
		}
		bodySize = len(body)
		header := c.Request.UserAgent()
		// todo 写入标准格式
		res := fmt.Sprintf("%v - - [%v +8000] \"%v %v %v\" %v %v \"-\" \"%v\"", ip, utcTimeStr, method, url, http, status, bodySize, header) // 因为是东八区我就写死了
		// todo 写入文件
		file, _ := os.OpenFile(config.GinNginxLogPath, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
		defer file.Close()
		wr := &SyncWriter{sync.Mutex{}, file} // 添加上锁
		wg := sync.WaitGroup{}
		wg.Add(1)
		go func(content string) { // fork子协程去写
			fmt.Fprintln(wr, content)
			wg.Done()
		}(res)
		wg.Wait()
		c.Next()
	}
}

type SyncWriter struct {
	m      sync.Mutex
	Writer io.Writer
}

func (w *SyncWriter) Write(b []byte) (n int, err error) {
	w.m.Lock()
	defer w.m.Unlock()
	return w.Writer.Write(b)
}

/*
作者: HengY1
链接: https://www.hengy1.top/article/a637161.html
来源: 恒HengY1毅
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
*/
