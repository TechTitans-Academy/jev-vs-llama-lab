import time
from demo_jev import JEVClassifierModel

def run_benchmark(num_requests=100):
    jev = JEVClassifierModel()
    
    print("=" * 60)
    print(f"🚀 BENCHMARKING JEV CLASSIFIER ({num_requests} ITERATIONS)")
    print("=" * 60)
    
    start_time = time.perf_counter()
    for i in range(num_requests):
        jev.predict_state(f"Customer inquiry request item number {i} with broken item")
    
    total_sec = time.perf_counter() - start_time
    avg_latency_ms = (total_sec / num_requests) * 1000
    throughput = num_requests / total_sec
    
    print(f"Total Execution Time : {total_sec:.4f} seconds")
    print(f"Average Latency      : {avg_latency_ms:.3f} ms per decision")
    print(f"Throughput           : {throughput:.2f} decisions / sec")
    print(f"Total Tokens         : 0 (Non-autoregressive)")
    print("=" * 60)

if __name__ == "__main__":
    run_benchmark()
